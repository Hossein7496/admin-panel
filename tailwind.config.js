/**
 * تنظیمات Tailwind CSS - Tailwind CSS Configuration
 * این فایل شامل تنظیمات فریمورک CSS Tailwind است
 * This file contains the configuration for the Tailwind CSS framework
 * 
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // مسیرهای فایل‌هایی که باید اسکن شوند - File paths to scan for classes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",      // صفحات - Pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // کامپوننت‌ها - Components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",        // فایل‌های اپ - App files
  ],
  theme: {
    extend: {
      // رنگ‌های سفارشی - Custom colors
      colors: {
        background: "var(--background)", // رنگ پس‌زمینه - Background color
        foreground: "var(--foreground)", // رنگ متن - Text color
      },
      // فونت‌های سفارشی - Custom fonts
      fontFamily: {
        // فونت فارسی وزیرمتن - Persian font Vazirmatn
        'vazir': ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
        // فونت پیش‌فرض - Default font
        'sans': ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  // پلاگین‌های اضافی - Additional plugins
  plugins: [],
};
