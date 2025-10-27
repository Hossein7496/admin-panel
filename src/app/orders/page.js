/**
 * صفحه مدیریت سفارشات - Orders Management Page
 * این صفحه برای مدیریت سفارشات مشتریان استفاده می‌شود
 * This page is used for managing customer orders
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Search, Filter, Eye, Edit, Truck } from 'lucide-react';
import Link from 'next/link';

// داده‌های نمونه سفارشات - Sample orders data
const orders = [
  {
    id: '#12345',
    customer: 'احمد محمدی',
    email: 'ahmad@example.com',
    phone: '09123456789',
    date: '1403/01/15',
    amount: '2,500,000',
    status: 'در حال پردازش',
    paymentStatus: 'پرداخت شده',
    items: 3
  },
  {
    id: '#12346',
    customer: 'فاطمه احمدی',
    email: 'fateme@example.com',
    phone: '09123456790',
    date: '1403/01/14',
    amount: '1,800,000',
    status: 'ارسال شده',
    paymentStatus: 'پرداخت شده',
    items: 2
  },
  {
    id: '#12347',
    customer: 'علی رضایی',
    email: 'ali@example.com',
    phone: '09123456791',
    date: '1403/01/13',
    amount: '3,200,000',
    status: 'تحویل شده',
    paymentStatus: 'پرداخت شده',
    items: 1
  },
  {
    id: '#12348',
    customer: 'مریم حسینی',
    email: 'maryam@example.com',
    phone: '09123456792',
    date: '1403/01/12',
    amount: '950,000',
    status: 'در انتظار پرداخت',
    paymentStatus: 'در انتظار',
    items: 4
  },
  {
    id: '#12349',
    customer: 'حسن کریمی',
    email: 'hasan@example.com',
    phone: '09123456793',
    date: '1403/01/11',
    amount: '4,100,000',
    status: 'لغو شده',
    paymentStatus: 'لغو شده',
    items: 2
  },
];

/**
 * تابع دریافت رنگ وضعیت سفارش - Get order status color function
 * @param {string} status - وضعیت سفارش - Order status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'در حال پردازش': // Processing
      return 'bg-blue-100 text-blue-800';
    case 'ارسال شده': // Shipped
      return 'bg-yellow-100 text-yellow-800';
    case 'تحویل شده': // Delivered
      return 'bg-green-100 text-green-800';
    case 'در انتظار پرداخت': // Pending payment
      return 'bg-orange-100 text-orange-800';
    case 'لغو شده': // Cancelled
      return 'bg-red-100 text-red-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * تابع دریافت رنگ وضعیت پرداخت - Get payment status color function
 * @param {string} status - وضعیت پرداخت - Payment status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'پرداخت شده': // Paid
      return 'bg-green-100 text-green-800';
    case 'در انتظار': // Pending
      return 'bg-yellow-100 text-yellow-800';
    case 'لغو شده': // Cancelled
      return 'bg-red-100 text-red-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * کامپوننت مدیریت سفارشات - Orders Management Component
 * @returns {JSX.Element} - صفحه مدیریت سفارشات - Orders management page
 */
export default function Orders() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت سفارشات</h1>
        </div>

        {/* فیلترها و جستجو */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در سفارشات..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">همه وضعیت‌ها</option>
              <option value="در انتظار پرداخت">در انتظار پرداخت</option>
              <option value="در حال پردازش">در حال پردازش</option>
              <option value="ارسال شده">ارسال شده</option>
              <option value="تحویل شده">تحویل شده</option>
              <option value="لغو شده">لغو شده</option>
            </select>
            
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* جدول سفارشات */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    شماره سفارش
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مشتری
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت سفارش
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت پرداخت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.items} آیتم</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.amount} تومان</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Truck className="w-4 h-4" />
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
              نمایش 1 تا 5 از 25 سفارش
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
