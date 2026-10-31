# Barbershop Frontend

وب‌سایت فارسی و راست‌چین آرایشگاه مردانه، ساخته‌شده با HTML/CSS/JavaScript خالص.

## اجرا
فایل `index.html` را با Live Server اجرا کنید یا پوشه را روی Cloudflare Pages منتشر کنید.

## اتصال API
در `assets/js/config.js` مقدار `API_BASE_URL` را برابر آدرس Worker بک‌اند قرار دهید؛ مانند:
`https://barbershop-backend.<account>.workers.dev`

## مسیرها
- `/` صفحه عمومی
- `/admin.html` پنل مدیریت

پنل مدیریت برای ورود و دریافت اطلاعات به بک‌اند متصل است. تا قبل از تنظیم آدرس API، فرم‌ها پیام خطای اتصال نمایش می‌دهند و اطلاعات ساختگی ذخیره نمی‌کنند.
