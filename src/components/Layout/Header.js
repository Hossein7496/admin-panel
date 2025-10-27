/**
 * کامپوننت هدر اپلیکیشن - Application Header Component
 * این کامپوننت شامل عنوان صفحه، جستجو، اعلان‌ها و پروفایل کاربر است
 * This component includes page title, search, notifications and user profile
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن آیکون‌های مورد نیاز - Import required icons
import { Bell, Search, User, Menu } from 'lucide-react';

// وارد کردن Next.js hooks - Import Next.js hooks
import { usePathname } from 'next/navigation';

/**
 * تابع دریافت عنوان صفحه بر اساس مسیر - Get page title based on path
 * @param {string} pathname - مسیر فعلی - Current path
 * @returns {string} - عنوان صفحه - Page title
 */
const getPageTitle = (pathname) => {
  // نقشه مسیرها به عنوان‌ها - Path to title mapping
  const titles = {
    '/': 'داشبورد',                    // Dashboard
    '/products': 'مدیریت محصولات',      // Product Management
    '/products/add': 'افزودن محصول',    // Add Product
    '/orders': 'مدیریت سفارشات',        // Order Management
    '/users': 'مدیریت کاربران',         // User Management
    '/categories': 'مدیریت دسته‌بندی‌ها', // Category Management
    '/brands': 'مدیریت برندها',         // Brand Management
    '/reviews': 'مدیریت نظرات',         // Review Management
    '/discounts': 'مدیریت کدهای تخفیف', // Discount Management
    '/content': 'مدیریت محتوا',         // Content Management
    '/settings': 'تنظیمات'              // Settings
  };
  
  return titles[pathname] || 'پنل ادمین'; // بازگشت عنوان یا عنوان پیش‌فرض - Return title or default
};

/**
 * کامپوننت هدر - Header Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {Function} props.onMenuClick - تابع کلیک منو - Menu click function
 * @returns {JSX.Element} - هدر اپلیکیشن - Application header
 */
export default function Header({ onMenuClick }) {
  // دریافت مسیر فعلی - Get current path
  const pathname = usePathname();
  // دریافت عنوان صفحه - Get page title
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* دکمه منوی همبرگری - فقط در موبایل - Hamburger menu button - mobile only */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors ml-3"
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* عنوان صفحه - Page title */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{pageTitle}</h2>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
          {/* بخش جستجو - فقط در دسکتاپ - Search section - desktop only */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجو..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* دکمه اعلان‌ها - Notifications button */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {/* نشانگر اعلان جدید - New notification indicator */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* پروفایل کاربر - User profile */}
          <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
            {/* آواتار کاربر - User avatar */}
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {/* اطلاعات کاربر - فقط در صفحات بزرگ - User info - large screens only */}
            <div className="text-sm hidden sm:block">
              <div className="font-medium text-gray-800">مدیر سیستم</div>
              <div className="text-gray-500">admin@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
