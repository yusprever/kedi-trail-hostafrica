<?php
/**
 * Kedi Trail Adventures — Mail Configuration
 * 
 * SETUP INSTRUCTIONS FOR HOSTAFRICA:
 * 1. Log into cPanel → Email Accounts → Create: info@keditrail.com
 * 2. Note your SMTP settings from cPanel → Email Accounts → Connect Devices
 * 3. Update SMTP_HOST, SMTP_USER, SMTP_PASS below with your actual credentials
 * 4. The SMTP port is typically 465 (SSL) or 587 (TLS) on HostAfrica
 */

// ===== COMPANY INFO =====
define('COMPANY_NAME', 'Kedi Trail Adventures');
define('COMPANY_EMAIL', 'info@keditrail.com');       // Receiving email
define('COMPANY_PHONE', '+254 798 969 694');
define('SITE_URL', 'https://www.keditrail.com');

// ===== SMTP SETTINGS (HostAfrica cPanel) =====
define('SMTP_HOST', 'mail.keditrail.com');           // Usually mail.yourdomain.com
define('SMTP_PORT', 587);                             // 465 for SSL, 587 for TLS
define('SMTP_USER', 'info@keditrail.com');            // Full email address
define('SMTP_PASS', 'Mcharo79');                              // ← SET YOUR EMAIL PASSWORD HERE
define('SMTP_SECURE', 'tls');                         // 'ssl' for port 465, 'tls' for 587

// ===== LOGGING =====
define('LOG_DIR', __DIR__ . '/../logs');
define('LOG_ENABLED', true);

// ===== RATE LIMITING =====
define('RATE_LIMIT_DIR', __DIR__ . '/../logs/rate');
define('RATE_LIMIT_MAX', 5);                          // Max submissions per IP per hour
define('RATE_LIMIT_WINDOW', 3600);                    // 1 hour in seconds

// ===== INITIALIZATION =====
// Create log directories if they don't exist
if (!is_dir(LOG_DIR)) @mkdir(LOG_DIR, 0755, true);
if (!is_dir(RATE_LIMIT_DIR)) @mkdir(RATE_LIMIT_DIR, 0755, true);

// Protect log directory
$htaccess = LOG_DIR . '/.htaccess';
if (!file_exists($htaccess)) {
    file_put_contents($htaccess, "Deny from all\n");
}

/**
 * Send email via SMTP using fsockopen (no external libraries needed)
 */
function sendMail($to, $subject, $htmlBody, $replyTo = '') {
    // Try SMTP first, fall back to PHP mail()
    $smtpSent = sendViaSMTP($to, $subject, $htmlBody, $replyTo);
    
    if ($smtpSent) {
        logEntry('MAIL_SENT', "To: $to | Subject: $subject | Method: SMTP");
        return true;
    }
    
    // Fallback to PHP mail() if SMTP fails
    logEntry('SMTP_FAILED', "Falling back to PHP mail() for: $to");
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . COMPANY_NAME . " <" . COMPANY_EMAIL . ">\r\n";
    if ($replyTo) {
        $headers .= "Reply-To: $replyTo\r\n";
    }
    $headers .= "X-Mailer: KediTrail/1.0\r\n";
    
    $sent = @mail($to, $subject, $htmlBody, $headers);
    logEntry($sent ? 'MAIL_SENT' : 'MAIL_FAILED', "To: $to | Subject: $subject | Method: mail()");
    return $sent;
}

/**
 * SMTP sender using fsockopen — works on HostAfrica without Composer/PHPMailer
 */
function sendViaSMTP($to, $subject, $htmlBody, $replyTo = '') {
    if (!SMTP_PASS) return false; // Skip SMTP if password not configured
    
    $from = COMPANY_EMAIL;
    $fromName = COMPANY_NAME;
    
    // Build the email message
    $boundary = md5(uniqid(time()));
    $message  = "MIME-Version: 1.0\r\n";
    $message .= "From: $fromName <$from>\r\n";
    $message .= "To: $to\r\n";
    $message .= "Subject: $subject\r\n";
    if ($replyTo) $message .= "Reply-To: $replyTo\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "X-Mailer: KediTrail/1.0\r\n";
    $message .= "\r\n";
    $message .= $htmlBody;
    
    try {
        $prefix = (SMTP_SECURE === 'ssl') ? 'ssl://' : '';
        $socket = @fsockopen($prefix . SMTP_HOST, SMTP_PORT, $errno, $errstr, 15);
        if (!$socket) {
            logEntry('SMTP_ERROR', "Connection failed: $errstr ($errno)");
            return false;
        }
        
        // Set timeout
        stream_set_timeout($socket, 15);
        
        // Read greeting
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '220') { fclose($socket); return false; }
        
        // EHLO
        fwrite($socket, "EHLO " . SMTP_HOST . "\r\n");
        $response = readSMTPResponse($socket);
        
        // STARTTLS for port 587
        if (SMTP_SECURE === 'tls') {
            fwrite($socket, "STARTTLS\r\n");
            $response = fgets($socket, 512);
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            fwrite($socket, "EHLO " . SMTP_HOST . "\r\n");
            $response = readSMTPResponse($socket);
        }
        
        // AUTH LOGIN
        fwrite($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 512);
        fwrite($socket, base64_encode(SMTP_USER) . "\r\n");
        $response = fgets($socket, 512);
        fwrite($socket, base64_encode(SMTP_PASS) . "\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '235') {
            logEntry('SMTP_AUTH_FAILED', trim($response));
            fclose($socket);
            return false;
        }
        
        // MAIL FROM
        fwrite($socket, "MAIL FROM: <$from>\r\n");
        $response = fgets($socket, 512);
        
        // RCPT TO
        fwrite($socket, "RCPT TO: <$to>\r\n");
        $response = fgets($socket, 512);
        
        // DATA
        fwrite($socket, "DATA\r\n");
        $response = fgets($socket, 512);
        fwrite($socket, $message . "\r\n.\r\n");
        $response = fgets($socket, 512);
        $success = (substr($response, 0, 3) === '250');
        
        // QUIT
        fwrite($socket, "QUIT\r\n");
        fclose($socket);
        
        return $success;
    } catch (Exception $e) {
        logEntry('SMTP_EXCEPTION', $e->getMessage());
        return false;
    }
}

function readSMTPResponse($socket) {
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }
    return $response;
}

/**
 * Input sanitization
 */
function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

/**
 * JSON API response with CORS headers
 */
function jsonResponse($success, $message = '') {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: ' . SITE_URL);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

/**
 * Rate limiting by IP
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = RATE_LIMIT_DIR . '/' . md5($ip) . '.json';
    
    $data = ['count' => 0, 'first' => time()];
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true) ?: $data;
    }
    
    // Reset if window expired
    if (time() - $data['first'] > RATE_LIMIT_WINDOW) {
        $data = ['count' => 0, 'first' => time()];
    }
    
    $data['count']++;
    file_put_contents($file, json_encode($data));
    
    if ($data['count'] > RATE_LIMIT_MAX) {
        logEntry('RATE_LIMIT', "IP: $ip blocked after {$data['count']} requests");
        jsonResponse(false, 'Too many requests. Please try again later.');
    }
}

/**
 * Basic honeypot spam check
 */
function checkSpam() {
    // If honeypot field is filled, it's a bot
    if (!empty($_POST['website_url'])) {
        logEntry('SPAM_BLOCKED', 'Honeypot triggered from IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        jsonResponse(false, 'Submission rejected.');
    }
}

/**
 * Logging
 */
function logEntry($type, $message) {
    if (!LOG_ENABLED) return;
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $line = "[$timestamp] [$type] [IP: $ip] $message\n";
    @file_put_contents(LOG_DIR . '/mail.log', $line, FILE_APPEND | LOCK_EX);
}

/**
 * Email confirmation template
 */
function getConfirmationTemplate($name, $type, $details) {
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#333">
    <div style="text-align:center;padding:1.5rem 0;border-bottom:2px solid #C8860A">
      <h1 style="color:#2E7D32;font-size:1.5rem;margin:0">' . COMPANY_NAME . '</h1>
    </div>
    <div style="padding:2rem 0">
      <h2 style="color:#2E7D32;font-size:1.25rem">Thank you, ' . htmlspecialchars($name) . '!</h2>
      <p style="line-height:1.8;color:#555">We have received your <strong>' . $type . '</strong> and a member of our team will respond within 24 hours.</p>
      ' . $details . '
      <p style="line-height:1.8;color:#555;margin-top:1.5rem">If you have any urgent queries, please contact us at <a href="tel:' . COMPANY_PHONE . '" style="color:#C8860A">' . COMPANY_PHONE . '</a> or <a href="mailto:' . COMPANY_EMAIL . '" style="color:#C8860A">' . COMPANY_EMAIL . '</a>.</p>
      <p style="color:#555">Warm regards,<br><strong>The ' . COMPANY_NAME . ' Team</strong></p>
    </div>
    <div style="text-align:center;padding:1rem 0;border-top:1px solid #eee;font-size:0.75rem;color:#999">
      <p>' . COMPANY_NAME . ' &bull; Voi, Taita Taveta, Kenya<br><a href="' . SITE_URL . '" style="color:#C8860A">' . SITE_URL . '</a></p>
    </div></body></html>';
}
