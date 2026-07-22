<?php
require_once __DIR__ . '/mail-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonResponse(false, 'Invalid method'); }

checkRateLimit();
checkSpam();

$fields = [];
foreach ($_POST as $k => $v) {
    if ($k !== 'website_url') { // Skip honeypot
        $fields[sanitize($k)] = sanitize($v);
    }
}

$name  = $fields['name'] ?? '';
$email = $fields['email'] ?? '';

if (!$name || !$email) { jsonResponse(false, 'Name and email are required.'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonResponse(false, 'Please enter a valid email address.'); }

logEntry('CONTACT_FORM', "Name: $name | Email: $email");

$companyBody = '<h2 style="color:#2E7D32">New Contact Enquiry</h2>
<p style="color:#555;font-size:0.875rem">Submitted: ' . date('j M Y, g:i A') . ' (EAT)</p>
<table style="border-collapse:collapse;width:100%;margin-top:1rem">';
foreach ($fields as $k => $v) {
    if ($v && $k !== 'form_source') $companyBody .= '<tr><td style="padding:10px 14px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;width:150px;color:#333">'.ucfirst($k).'</td><td style="padding:10px 14px;border:1px solid #e5e5e5;color:#555">'.$v.'</td></tr>';
}
$companyBody .= '</table>';
$sent = sendMail(COMPANY_EMAIL, 'Contact Enquiry from ' . $name, $companyBody, $email);

sendMail($email, 'Thank you for contacting ' . COMPANY_NAME, getConfirmationTemplate($name, 'enquiry', ''));

jsonResponse($sent, $sent ? 'Message sent successfully.' : 'Failed to send. Please try again or email us directly.');
