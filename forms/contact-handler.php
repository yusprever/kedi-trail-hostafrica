<?php
require_once __DIR__ . '/mail-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonResponse(false, 'Invalid method'); }

$fields = [];
foreach ($_POST as $k => $v) { $fields[sanitize($k)] = sanitize($v); }

$name  = $fields['name'] ?? ($fields['Full name'] ?? '');
$email = $fields['email'] ?? '';

if (!$name || !$email) { jsonResponse(false, 'Name and email are required'); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonResponse(false, 'Invalid email'); }

$companyBody = '<h2>New Contact Enquiry</h2><table style="border-collapse:collapse;width:100%">';
foreach ($fields as $k => $v) {
    if ($v && $k !== 'form_source') $companyBody .= '<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;background:#f9f9f9;width:140px">'.ucfirst($k).'</td><td style="padding:8px 12px;border:1px solid #ddd">'.$v.'</td></tr>';
}
$companyBody .= '</table>';
$sent = sendMail(COMPANY_EMAIL, 'Contact Enquiry from ' . $name, $companyBody, $email);

sendMail($email, 'Thank you for contacting ' . COMPANY_NAME, getConfirmationTemplate($name, 'enquiry', ''));

jsonResponse($sent);
