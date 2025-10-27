/**
 * صفحه جزئیات کاربر - User Details Page
 * این صفحه جزئیات کامل یک کاربر خاص را نمایش می‌دهد
 * This page displays complete details of a specific user
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { ArrowLeft, Edit, User, Mail, Phone, MapPin, Calendar, ShoppingCart, DollarSign } from 'lucide-react';
import Link from 'next/link';

// داده‌های نمونه کاربر - Sample user data
const userDetails = {
  id: 1,
  name: 'احمد محمدی',
  email: 'ahmad@example.com',
  phone: '09123456789',
  address: 'تهران، خیابان ولیعصر، پلاک 123، طبقه 2',
  joinDate: '1402/12/15',
  role: 'کاربر عادی',
  status: 'فعال',
  totalOrders: 5,
  totalSpent: '12,500,000',
  lastOrderDate: '1403/01/10',
  orders: [
    {
      id: '#12345',
      date: '1403/01/10',
      amount: '2,500,000',
      status: 'تحویل شده',
      items: 3
    },
    {
      id: '#12340',
      date: '1402/12/25',
      amount: '1,800,000',
      status: 'تحویل شده',
      items: 2
    },
    {
      id: '#12335',
      date: '1402/12/15',
      amount: '3,200,000',
      status: 'تحویل شده',
      items: 1
    },
    {
      id: '#12330',
      date: '1402/11/20',
      amount: '950,000',
      status: 'تحویل شده',
      items: 4
    },
    {
      id: '#12325',
      date: '1402/11/05',
      amount: '4,100,000',
      status: 'تحویل شده',
      items: 2
    }
  ]
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
 * کامپوننت جزئیات کاربر - User Details Component
 * @returns {JSX.Element} - صفحه جزئیات کاربر - User details page
 */
export default function UserDetails() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* دکمه بازگشت - Back button */}
            <Link
              href="/users"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            {/* عنوان صفحه - Page title */}
            <h1 className="text-2xl font-bold text-gray-900">جزئیات کاربر</h1>
          </div>
          {/* دکمه ویرایش - Edit button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Edit className="w-4 h-4 ml-2" />
            ویرایش اطلاعات
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* اطلاعات کاربر */}
          <div className="lg:col-span-2 space-y-6">
            {/* اطلاعات شخصی */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات شخصی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userDetails.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userDetails.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userDetails.phone}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ عضویت</label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userDetails.joinDate}</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-gray-900">{userDetails.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* آمار کلی */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">آمار کلی</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">{userDetails.totalOrders}</p>
                  <p className="text-sm text-blue-700">تعداد سفارشات</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">{userDetails.totalSpent}</p>
                  <p className="text-sm text-green-700">مجموع خرید (تومان)</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">{userDetails.lastOrderDate}</p>
                  <p className="text-sm text-purple-700">آخرین سفارش</p>
                </div>
              </div>
            </div>

            {/* تاریخچه سفارشات */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">تاریخچه سفارشات</h2>
              <div className="space-y-3">
                {userDetails.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.items} آیتم</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{order.amount} تومان</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* پنل کناری */}
          <div className="space-y-6">
            {/* وضعیت کاربر */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">وضعیت کاربر</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نقش</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(userDetails.role)}`}>
                    {userDetails.role}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وضعیت</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(userDetails.status)}`}>
                    {userDetails.status}
                  </span>
                </div>
              </div>
            </div>

            {/* عملیات سریع */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">عملیات سریع</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  ارسال پیام
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  ایجاد سفارش
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  اعطای تخفیف
                </button>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  مسدود کردن
                </button>
              </div>
            </div>

            {/* اطلاعات اضافی */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات اضافی</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین ورود:</span>
                  <span className="text-gray-900">1403/01/15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IP آخرین ورود:</span>
                  <span className="text-gray-900">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مرورگر:</span>
                  <span className="text-gray-900">Chrome</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">سیستم عامل:</span>
                  <span className="text-gray-900">Windows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
