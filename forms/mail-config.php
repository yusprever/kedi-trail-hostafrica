<?php
// Kedi Trail Adventures — Mail Configuration
define('COMPANY_NAME', 'Kedi Trail Adventures');
define('COMPANY_EMAIL', 'info@keditrail.com');
define('COMPANY_PHONE', '+254 798969694');
define('SITE_URL', 'https://www.keditrail.com');

function sendMail($to, $subject, $htmlBody, $replyTo = '') {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . COMPANY_NAME . " <" . COMPANY_EMAIL . ">\r\n";
    if ($replyTo) {
        $headers .= "Reply-To: " . $replyTo . "\r\n";
    }
    return mail($to, $subject, $htmlBody, $headers);
}

function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

function jsonResponse($success, $message = '') {
    header('Content-Type: application/json');
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

function getConfirmationTemplate($name, $type, $details) {
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:2rem;color:#333"><div style="text-align:center;padding:1.5rem 0;border-bottom:2px solid #C8860A"><h1 style="color:#2E7D32;font-size:1.5rem;margin:0">' . COMPANY_NAME . '</h1></div><div style="padding:2rem 0"><h2 style="color:#2E7D32;font-size:1.25rem">Thank you, ' . htmlspecialchars($name) . '!</h2><p style="line-height:1.8;color:#555">We have received your <strong>' . $type . '</strong> and a member of our team will respond within 24 hours.</p>' . $details . '<p style="line-height:1.8;color:#555;margin-top:1.5rem">If you have any urgent queries, please contact us at <a href="tel:' . COMPANY_PHONE . '" style="color:#C8860A">' . COMPANY_PHONE . '</a> or <a href="mailto:' . COMPANY_EMAIL . '" style="color:#C8860A">' . COMPANY_EMAIL . '</a>.</p><p style="color:#555">Warm regards,<br><strong>The ' . COMPANY_NAME . ' Team</strong></p></div><div style="text-align:center;padding:1rem 0;border-top:1px solid #eee;font-size:0.75rem;color:#999"><p>' . COMPANY_NAME . ' &bull; Voi, Taita Taveta, Kenya<br><a href="' . SITE_URL . '" style="color:#C8860A">' . SITE_URL . '</a></p></div></body></html>';
}
