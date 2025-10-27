/**
 * کامپوننت لایه اصلی اپلیکیشن - Main Application Layout Component
 * این کامپوننت ساختار کلی اپلیکیشن شامل هدر، سایدبار و محتوای اصلی را مدیریت می‌کند
 * This component manages the overall application structure including header, sidebar and main content
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن React hooks - Import React hooks
import { useState } from 'react';

// وارد کردن کامپوننت‌های لایه - Import layout components
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';

/**
 * کامپوننت لایه اصلی - Main Layout Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {React.ReactNode} props.children - محتوای صفحات - Page content
 * @returns {JSX.Element} - ساختار لایه اصلی - Main layout structure
 */
export default function Layout({ children }) {
  // حالت باز/بسته بودن سایدبار - Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * تابع تغییر وضعیت سایدبار - Toggle sidebar function
   * سایدبار را باز یا بسته می‌کند - Opens or closes the sidebar
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /**
   * تابع بستن سایدبار - Close sidebar function
   * سایدبار را می‌بندد - Closes the sidebar
   */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* لایه تیره برای موبایل - Dark overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* سایدبار - Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>
      
      {/* محتوای اصلی - Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* هدر - Header */}
        <Header onMenuClick={toggleSidebar} />
        {/* محتوای صفحات - Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
