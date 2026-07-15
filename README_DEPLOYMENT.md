# Kedi Trail Adventures — HostAfrica Deployment

## Quick Deploy
1. Log into HostAfrica cPanel
2. File Manager → `public_html`
3. Upload and extract the ZIP
4. Ensure `index.html` is at root of `public_html`

## Email Configuration
Edit `forms/mail-config.php` and update:
- `COMPANY_EMAIL` — your receiving email
- `COMPANY_PHONE` — your phone number
- `SITE_URL` — your domain

## SSL
Uncomment the HTTPS redirect in `.htaccess` once SSL is active.

## Social Media
Update placeholder `#` links in the footer with your actual social media profile URLs.
