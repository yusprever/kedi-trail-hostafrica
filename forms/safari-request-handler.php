<?php
require_once __DIR__ . '/mail-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonResponse(false, 'Invalid method'); }

// Security checks
checkRateLimit();
checkSpam();

$name     = sanitize($_POST['name'] ?? '');
$email    = sanitize($_POST['email'] ?? '');
$phone    = sanitize($_POST['phone'] ?? '');
$country  = sanitize($_POST['country'] ?? '');
$dates    = sanitize($_POST['dates'] ?? '');
$group    = sanitize($_POST['group'] ?? '');
$message  = sanitize($_POST['message'] ?? '');
$journey  = sanitize($_POST['journey'] ?? '');
$dest     = sanitize($_POST['destination'] ?? '');
$duration = sanitize($_POST['duration'] ?? '');

if (!$name || !$email) { jsonResponse(false, 'Name and email are required.'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonResponse(false, 'Please enter a valid email address.'); }

logEntry('SAFARI_REQUEST', "Journey: $journey | Name: $name | Email: $email");

// Send to company
$companyBody = '<h2 style="color:#2E7D32">New Safari Request</h2>
<p style="color:#555;font-size:0.875rem">Submitted: ' . date('j M Y, g:i A') . ' (EAT)</p>
<table style="border-collapse:collapse;width:100%;margin-top:1rem">';
$fields = ['Journey'=>$journey,'Destination'=>$dest,'Duration'=>$duration,'Name'=>$name,'Email'=>$email,'Phone'=>$phone,'Country'=>$country,'Travel Dates'=>$dates,'Group Size'=>$group,'Message'=>$message];
foreach ($fields as $k => $v) {
    if ($v) $companyBody .= '<tr><td style="padding:10px 14px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;width:150px;color:#333">'.$k.'</td><td style="padding:10px 14px;border:1px solid #e5e5e5;color:#555">'.$v.'</td></tr>';
}
$companyBody .= '</table>';
$sent = sendMail(COMPANY_EMAIL, 'Safari Request: ' . $journey . ' — ' . $name, $companyBody, $email);

// Auto-reply to visitor
$details = '<div style="background:#f9f9f9;border-radius:8px;padding:1rem;margin:1rem 0">
<p style="margin:0;font-size:0.875rem;color:#555"><strong>Journey:</strong> '.$journey.'<br><strong>Destination:</strong> '.$dest.'<br><strong>Duration:</strong> '.$duration.'</p></div>';
sendMail($email, 'Your Safari Request — ' . COMPANY_NAME, getConfirmationTemplate($name, 'safari request', $details));

jsonResponse($sent, $sent ? 'Safari request submitted successfully.' : 'Failed to send. Please try again or email us directly.');
