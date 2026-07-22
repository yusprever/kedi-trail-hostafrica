# Kedi Trail Adventures — HostAfrica Deployment Guide

## Quick Deploy
1. Log into HostAfrica **cPanel**
2. **File Manager** → navigate to `public_html`
3. Upload `kedi-trail-hostafrica.zip` and extract it
4. Ensure `index.html` is at the root of `public_html`

---

## Email Setup (CRITICAL — do this before forms will work)

### Step 1: Create Email Account in cPanel
1. cPanel → **Email Accounts** → Create
2. Email: `info@keditrail.com`
3. Set a strong password — you'll need it below

### Step 2: Find Your SMTP Settings
1. cPanel → **Email Accounts** → click **Connect Devices** next to your email
2. Note these values:
   - **SMTP Server**: usually `mail.keditrail.com`
   - **SMTP Port**: `465` (SSL) or `587` (TLS)
   - **Username**: `info@keditrail.com`
   - **Password**: the one you just set

### Step 3: Configure the Website
1. **File Manager** → open `forms/mail-config.php`
2. Update these lines with your actual values:
```php
define('SMTP_HOST', 'mail.keditrail.com');    // From Step 2
define('SMTP_PORT', 465);                      // From Step 2
define('SMTP_USER', 'info@keditrail.com');     // Your email
define('SMTP_PASS', 'your-password-here');     // ← YOUR PASSWORD
define('SMTP_SECURE', 'ssl');                  // 'ssl' for 465, 'tls' for 587
```
3. Save the file

### Step 4: Test
1. Visit your website and submit the contact form
2. Check `info@keditrail.com` inbox for the enquiry
3. Check the sender also received the auto-reply

### Troubleshooting
- Check `logs/mail.log` in File Manager for error details
- If SMTP fails, the system falls back to PHP `mail()` automatically
- Ensure your domain's DNS MX records point to HostAfrica's mail servers
- If emails go to spam, set up SPF/DKIM records in cPanel → **Email Deliverability**

---

## Logging
- Form submissions and email delivery are logged to `logs/mail.log`
- Rate limit data is stored in `logs/rate/`
- The `logs/` directory is protected by `.htaccess` (not publicly accessible)

## Security Features
- **Rate limiting**: 5 submissions per IP per hour
- **Honeypot field**: hidden form field that traps bots
- **Input sanitization**: all form data is sanitized before processing
- **CORS headers**: only accepts requests from your domain

## SSL/HTTPS
Uncomment the HTTPS redirect in `.htaccess` once your SSL certificate is active:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Social Media
Update the social links in `index.html` footer with your actual profile URLs.
The current placeholders point to `keditrailadventures` on each platform.

## File Structure
```
public_html/
├── index.html           ← Main website
├── 404.html             ← Error page
├── .htaccess            ← Apache config
├── robots.txt           ← SEO
├── sitemap.xml          ← Sitemap
├── assets/
│   ├── css/styles.css   ← Styles
│   ├── js/main.js       ← Application logic
│   ├── images/          ← All photos
│   ├── videos/          ← Hero videos
│   └── favicon/         ← Site icon
├── forms/
│   ├── mail-config.php  ← ⚠️ CONFIGURE THIS
│   ├── safari-request-handler.php
│   ├── experience-request-handler.php
│   └── contact-handler.php
└── logs/                ← Auto-created on first submission
    ├── mail.log
    └── rate/
```
