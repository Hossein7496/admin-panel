/**
 * کامپوننت سایدبار اپلیکیشن - Application Sidebar Component
 * این کامپوننت منوی ناوبری اصلی اپلیکیشن را نمایش می‌دهد
 * This component displays the main navigation menu of the application
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های Next.js - Import Next.js components
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// وارد کردن آیکون‌های مورد نیاز - Import required icons
import { 
  LayoutDashboard,  // آیکون داشبورد - Dashboard icon
  Package,          // آیکون محصولات - Products icon
  ShoppingCart,     // آیکون سفارشات - Orders icon
  Users,            // آیکون کاربران - Users icon
  FolderOpen,       // آیکون دسته‌بندی‌ها - Categories icon
  MessageSquare,    // آیکون نظرات - Reviews icon
  Percent,          // آیکون تخفیف‌ها - Discounts icon
  FileText,         // آیکون محتوا - Content icon
  Settings,         // آیکون تنظیمات - Settings icon
  ChevronDown,      // آیکون فلش پایین - Down arrow icon
  ChevronRight,     // آیکون فلش راست - Right arrow icon
  X                 // آیکون بستن - Close icon
} from 'lucide-react';

// وارد کردن React hooks - Import React hooks
import { useState } from 'react';

// آرایه آیتم‌های منو - Menu items array
const menuItems = [
  {
    title: 'داشبورد',           // Dashboard
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'محصولات',           // Products
    href: '/products',
    icon: Package,
    children: [
      { title: 'لیست محصولات', href: '/products' },    // Product List
      { title: 'افزودن محصول', href: '/products/add' }, // Add Product
    ]
  },
  {
    title: 'سفارشات',           // Orders
    href: '/orders',
    icon: ShoppingCart,
  },
  {
    title: 'کاربران',           // Users
    href: '/users',
    icon: Users,
  },
  {
    title: 'دسته‌بندی‌ها',      // Categories
    href: '/categories',
    icon: FolderOpen,
    children: [
      { title: 'دسته‌بندی‌ها', href: '/categories' },  // Categories
      { title: 'برندها', href: '/brands' },           // Brands
    ]
  },
  {
    title: 'نظرات',             // Reviews
    href: '/reviews',
    icon: MessageSquare,
  },
  {
    title: 'کدهای تخفیف',       // Discounts
    href: '/discounts',
    icon: Percent,
  },
  {
    title: 'مدیریت محتوا',      // Content Management
    href: '/content',
    icon: FileText,
  },
  {
    title: 'تنظیمات',           // Settings
    href: '/settings',
    icon: Settings,
  },
];

/**
 * کامپوننت سایدبار - Sidebar Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {Function} props.onClose - تابع بستن سایدبار - Close sidebar function
 * @returns {JSX.Element} - سایدبار اپلیکیشن - Application sidebar
 */
export default function Sidebar({ onClose }) {
  // دریافت مسیر فعلی - Get current path
  const pathname = usePathname();
  // حالت باز بودن آیتم‌های منو - Expanded menu items state
  const [expandedItems, setExpandedItems] = useState({});

  /**
   * تابع تغییر وضعیت باز بودن آیتم منو - Toggle menu item expansion
   * @param {string} title - عنوان آیتم منو - Menu item title
   */
  const toggleExpanded = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  /**
   * تابع کلیک روی لینک - Link click handler
   * سایدبار را در موبایل می‌بندد - Closes sidebar on mobile when link is clicked
   */
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full bg-gray-900 text-white min-h-screen">
      {/* هدر سایدبار - Sidebar header */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">پنل ادمین</h1>
        {/* دکمه بستن - فقط در موبایل - Close button - mobile only */}
        <button
          onClick={onClose}
          className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* منوی ناوبری - Navigation menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              /* آیتم منو با زیرمنو - Menu item with submenu */
              <div>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                    pathname.startsWith(item.href) ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 ml-3" />
                    <span>{item.title}</span>
                  </div>
                  {/* آیکون فلش - Arrow icon */}
                  {expandedItems[item.title] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {/* زیرمنو - Submenu */}
                {expandedItems[item.title] && (
                  <div className="bg-gray-800">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleLinkClick}
                        className={`block px-12 py-2 hover:bg-gray-700 transition-colors ${
                          pathname === child.href ? 'bg-gray-700' : ''
                        }`}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* آیتم منو ساده - Simple menu item */
              <Link
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${
                  pathname === item.href ? 'bg-gray-800' : ''
                }`}
              >
                <item.icon className="w-5 h-5 ml-3" />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
