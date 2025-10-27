/**
 * صفحه مدیریت کاربران - Users Management Page
 * این صفحه برای مدیریت کاربران سیستم استفاده می‌شود
 * This page is used for managing system users
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Search, Filter, Eye, Edit, User, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

// داده‌های نمونه کاربران - Sample users data
const users = [
  {
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    phone: '09123456789',
    role: 'کاربر عادی',
    joinDate: '1402/12/15',
    ordersCount: 5,
    totalSpent: '12,500,000',
    status: 'فعال'
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    email: 'fateme@example.com',
    phone: '09123456790',
    role: 'کاربر عادی',
    joinDate: '1402/11/20',
    ordersCount: 3,
    totalSpent: '8,200,000',
    status: 'فعال'
  },
  {
    id: 3,
    name: 'علی رضایی',
    email: 'ali@example.com',
    phone: '09123456791',
    role: 'مدیر',
    joinDate: '1402/10/10',
    ordersCount: 12,
    totalSpent: '45,000,000',
    status: 'فعال'
  },
  {
    id: 4,
    name: 'مریم حسینی',
    email: 'maryam@example.com',
    phone: '09123456792',
    role: 'کاربر عادی',
    joinDate: '1402/09/05',
    ordersCount: 0,
    totalSpent: '0',
    status: 'غیرفعال'
  },
  {
    id: '5',
    name: 'حسن کریمی',
    email: 'hasan@example.com',
    phone: '09123456793',
    role: 'کاربر عادی',
    joinDate: '1402/08/15',
    ordersCount: 7,
    totalSpent: '18,500,000',
    status: 'فعال'
  },
];

/**
 * تابع دریافت رنگ نقش کاربر - Get user role color function
 * @param {string} role - نقش کاربر - User role
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getRoleColor = (role) => {
  switch (role) {
    case 'مدیر': // Admin
      return 'bg-purple-100 text-purple-800';
    case 'کاربر عادی': // Regular user
      return 'bg-blue-100 text-blue-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * تابع دریافت رنگ وضعیت کاربر - Get user status color function
 * @param {string} status - وضعیت کاربر - User status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'فعال': // Active
      return 'bg-green-100 text-green-800';
    case 'غیرفعال': // Inactive
      return 'bg-red-100 text-red-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * کامپوننت مدیریت کاربران - Users Management Component
 * @returns {JSX.Element} - صفحه مدیریت کاربران - Users management page
 */
export default function Users() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
        </div>

        {/* فیلترها و جستجو */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در کاربران..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">همه نقش‌ها</option>
              <option value="مدیر">مدیر</option>
              <option value="کاربر عادی">کاربر عادی</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">همه وضعیت‌ها</option>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
            
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* جدول کاربران */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کاربر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    اطلاعات تماس
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ عضویت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    سفارشات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مجموع خرید
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نقش
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.joinDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.ordersCount} سفارش</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.totalSpent} تومان</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* بخش صفحه‌بندی - Pagination Section */}
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            {/* اطلاعات صفحه‌بندی - Pagination info */}
            <div className="text-sm text-gray-700">
              نمایش 1 تا 5 از 25 کاربر
            </div>
            {/* دکمه‌های صفحه‌بندی - Pagination buttons */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                قبلی
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                بعدی
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
