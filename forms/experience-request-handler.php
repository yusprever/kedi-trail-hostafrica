<?php
require_once __DIR__ . '/mail-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonResponse(false, 'Invalid method'); }

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

if (!$name || !$email) { jsonResponse(false, 'Name and email are required'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonResponse(false, 'Invalid email'); }

$companyBody = '<h2>New Experience Request</h2><table style="border-collapse:collapse;width:100%">';
$fields = ['Experience'=>$experience,'Name'=>$name,'Email'=>$email,'Phone'=>$phone,'Country'=>$country,'Dates'=>$dates,'Group'=>$group,'Budget'=>$budget,'Special Requirements'=>$special,'Message'=>$message];
foreach ($fields as $k => $v) {
    if ($v) $companyBody .= '<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;background:#f9f9f9;width:160px">'.$k.'</td><td style="padding:8px 12px;border:1px solid #ddd">'.$v.'</td></tr>';
}
$companyBody .= '</table>';
$sent = sendMail(COMPANY_EMAIL, 'Experience Request: ' . $experience . ' — ' . $name, $companyBody, $email);

$details = '<div style="background:#f9f9f9;border-radius:8px;padding:1rem;margin:1rem 0"><p style="margin:0;font-size:0.875rem;color:#555"><strong>Experience:</strong> '.$experience.'</p></div>';
sendMail($email, 'Your Experience Request — ' . COMPANY_NAME, getConfirmationTemplate($name, 'experience request', $details));

jsonResponse($sent);
