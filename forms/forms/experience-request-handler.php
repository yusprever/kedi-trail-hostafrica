<?php
require_once __DIR__ . '/mail-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonResponse(false, 'Invalid method'); }

checkRateLimit();
checkSpam();

$name       = sanitize($_POST['name'] ?? '');
$email      = sanitize($_POST['email'] ?? '');
$phone      = sanitize($_POST['phone'] ?? '');
$country    = sanitize($_POST['country'] ?? '');
$dates      = sanitize($_POST['dates'] ?? '');
$group      = sanitize($_POST['group'] ?? '');
$budget     = sanitize($_POST['budget'] ?? '');
$special    = sanitize($_POST['special'] ?? '');
$message    = sanitize($_POST['message'] ?? '');
$experience = sanitize($_POST['experience'] ?? '');

if (!$name || !$email) { jsonResponse(false, 'Name and email are required.'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonResponse(false, 'Please enter a valid email address.'); }

logEntry('EXPERIENCE_REQUEST', "Experience: $experience | Name: $name | Email: $email");

$companyBody = '<h2 style="color:#2E7D32">New Experience Request</h2>
<p style="color:#555;font-size:0.875rem">Submitted: ' . date('j M Y, g:i A') . ' (EAT)</p>
<table style="border-collapse:collapse;width:100%;margin-top:1rem">';
$fields = ['Experience'=>$experience,'Name'=>$name,'Email'=>$email,'Phone'=>$phone,'Country'=>$country,'Travel Dates'=>$dates,'Group Size'=>$group,'Budget'=>$budget,'Special Requirements'=>$special,'Message'=>$message];
foreach ($fields as $k => $v) {
    if ($v) $companyBody .= '<tr><td style="padding:10px 14px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;width:160px;color:#333">'.$k.'</td><td style="padding:10px 14px;border:1px solid #e5e5e5;color:#555">'.$v.'</td></tr>';
}
$companyBody .= '</table>';
$sent = sendMail(COMPANY_EMAIL, 'Experience Request: ' . $experience . ' — ' . $name, $companyBody, $email);

$details = '<div style="background:#f9f9f9;border-radius:8px;padding:1rem;margin:1rem 0">
<p style="margin:0;font-size:0.875rem;color:#555"><strong>Experience:</strong> '.$experience.'</p></div>';
sendMail($email, 'Your Experience Request — ' . COMPANY_NAME, getConfirmationTemplate($name, 'experience request', $details));

jsonResponse($sent, $sent ? 'Experience request submitted successfully.' : 'Failed to send. Please try again or email us directly.');
