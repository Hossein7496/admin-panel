/**
 * تنظیمات PostCSS - PostCSS Configuration
 * این فایل شامل تنظیمات ابزار پردازش CSS PostCSS است
 * This file contains the configuration for the PostCSS CSS processing tool
 * 
 * @type {import('postcss-load-config').Config}
 */
const config = {
  // پلاگین‌های PostCSS - PostCSS plugins
  plugins: {
    // پلاگین Tailwind CSS - Tailwind CSS plugin
    tailwindcss: {},
    // می‌توانید پلاگین‌های دیگری اضافه کنید:
    // You can add other plugins like:
    // autoprefixer: {}, // برای افزودن پیشوندهای مرورگر - For adding browser prefixes
    // cssnano: {},      // برای فشرده‌سازی CSS - For CSS minification
  },
};

export default config;
