/**
 * تنظیمات Next.js - Next.js Configuration
 * این فایل شامل تنظیمات اصلی فریمورک Next.js است
 * This file contains the main configuration for the Next.js framework
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // تنظیم Base Path برای استقرار در مسیر /admin
  // Setting Base Path for deployment at /admin route
  basePath: '/admin',
  
  // تنظیم Asset Prefix برای لود صحیح فایل‌های استاتیک
  // Setting Asset Prefix for correct loading of static files
  assetPrefix: '/admin',
  
  // در حال حاضر تنظیمات بالا برای استقرار در /admin استفاده می‌شود
  // Currently using above configuration for /admin deployment
  // می‌توانید تنظیمات اضافی مانند:
  // You can add additional configurations like:
  // - experimental features
  // - webpack customization
  // - environment variables
  // - redirects and rewrites
};

export default nextConfig;

