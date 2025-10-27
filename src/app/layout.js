/**
 * لایه اصلی اپلیکیشن - Root Layout Component
 * این کامپوننت لایه اصلی اپلیکیشن Next.js است که تمام صفحات را در بر می‌گیرد
 * This component is the root layout of the Next.js application that wraps all pages
 */

// وارد کردن استایل‌های سراسری - Import global styles
import './globals.css'

// متادیتای اپلیکیشن - Application metadata
export const metadata = {
  title: 'پنل ادمین - فروشگاه دیجیتال', // عنوان صفحه - Page title
  description: 'پنل مدیریت فروشگاه آنلاین', // توضیحات صفحه - Page description
}

/**
 * کامپوننت لایه اصلی - Root Layout Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {React.ReactNode} props.children - محتوای صفحات - Page content
 * @returns {JSX.Element} - عنصر HTML اصلی - Main HTML element
 */
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      {/* زبان فارسی و جهت راست به چپ - Persian language and RTL direction */}
      <body>{children}</body>
    </html>
  )
}
