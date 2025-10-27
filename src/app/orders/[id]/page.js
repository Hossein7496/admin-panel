/**
 * صفحه جزئیات سفارش - Order Details Page
 * این صفحه جزئیات کامل یک سفارش خاص را نمایش می‌دهد
 * This page displays complete details of a specific order
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { ArrowLeft, Edit, Truck, Package, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

// داده‌های نمونه سفارش - Sample order data
// داده‌های نمونه سفارش - Sample order data
const orderDetails = {
  id: '#12345', // شناسه سفارش - Order ID
  customer: { // اطلاعات مشتری - Customer information
    name: 'احمد محمدی', // نام مشتری - Customer name
    email: 'ahmad@example.com', // ایمیل مشتری - Customer email
    phone: '09123456789', // شماره تلفن مشتری - Customer phone
    address: 'تهران، خیابان ولیعصر، پلاک 123، طبقه 2' // آدرس مشتری - Customer address
  },
  date: '1403/01/15', // تاریخ سفارش - Order date
  status: 'در حال پردازش', // وضعیت سفارش - Order status
  paymentStatus: 'پرداخت شده', // وضعیت پرداخت - Payment status
  paymentMethod: 'کارت بانکی', // روش پرداخت - Payment method
  totalAmount: '2,500,000', // مبلغ کل - Total amount
  shippingCost: '50,000', // هزینه ارسال - Shipping cost
  discount: '100,000', // تخفیف - Discount
  finalAmount: '2,450,000', // مبلغ نهایی - Final amount
  trackingCode: '', // کد رهگیری - Tracking code
  items: [ // محصولات سفارش - Order items
    {
      id: 1, // شناسه محصول - Product ID
      name: 'آیفون 15 پرو مکس', // نام محصول - Product name
      sku: 'IPH15PM-256', // کد محصول - Product SKU
      price: '2,000,000', // قیمت محصول - Product price
      quantity: 1, // تعداد - Quantity
      total: '2,000,000', // مجموع - Total
      image: '/api/placeholder/60/60' // تصویر محصول - Product image
    },
    {
      id: 2, // شناسه محصول - Product ID
      name: 'کیف آیفون', // نام محصول - Product name
      sku: 'IPH-CASE-1', // کد محصول - Product SKU
      price: '250,000', // قیمت محصول - Product price
      quantity: 2, // تعداد - Quantity
      total: '500,000', // مجموع - Total
      image: '/api/placeholder/60/60' // تصویر محصول - Product image
    }
  ]
};

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
 * کامپوننت جزئیات سفارش - Order Details Component
 * @returns {JSX.Element} - صفحه جزئیات سفارش - Order details page
 */
export default function OrderDetails() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* دکمه بازگشت - Back button */}
            <Link
              href="/orders"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            {/* عنوان صفحه - Page title */}
            <h1 className="text-2xl font-bold text-gray-900">جزئیات سفارش {orderDetails.id}</h1>
          </div>
          {/* دکمه‌های عملیات - Action buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* دکمه ویرایش وضعیت - Edit status button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Edit className="w-4 h-4 ml-2" />
              ویرایش وضعیت
            </button>
            {/* دکمه ثبت کد رهگیری - Add tracking code button */}
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Truck className="w-4 h-4 ml-2" />
              ثبت کد رهگیری
            </button>
          </div>
        </div>

        {/* محتوای اصلی - Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* اطلاعات سفارش - Order information */}
          <div className="lg:col-span-2 space-y-6">
            {/* وضعیت سفارش - Order status */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">وضعیت سفارش</h2>
              <div className="flex items-center justify-between">
                <div>
                  {/* نشانگر وضعیت سفارش - Order status indicator */}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(orderDetails.status)}`}>
                    {orderDetails.status}
                  </span>
                  {/* تاریخ سفارش - Order date */}
                  <p className="text-sm text-gray-600 mt-1">تاریخ سفارش: {orderDetails.date}</p>
                </div>
                <div className="text-left">
                  {/* وضعیت پرداخت - Payment status */}
                  <p className="text-sm text-gray-600">وضعیت پرداخت</p>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(orderDetails.paymentStatus)}`}>
                    {orderDetails.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* محصولات سفارش - Order products */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">محصولات سفارش</h2>
              <div className="space-y-4">
                {/* لیست محصولات - Products list */}
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 space-x-reverse border-b border-gray-100 pb-4 last:border-b-0">
                    {/* تصویر محصول - Product image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    {/* اطلاعات محصول - Product information */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">کد محصول: {item.sku}</p>
                      <p className="text-sm text-gray-600">تعداد: {item.quantity}</p>
                    </div>
                    {/* قیمت محصول - Product price */}
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{item.price} تومان</p>
                      <p className="text-sm text-gray-600">مجموع: {item.total} تومان</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* اطلاعات پرداخت - Payment information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات پرداخت</h2>
              <div className="space-y-3">
                {/* روش پرداخت - Payment method */}
                <div className="flex justify-between">
                  <span className="text-gray-600">روش پرداخت:</span>
                  <span className="font-medium">{orderDetails.paymentMethod}</span>
                </div>
                {/* مبلغ کل - Total amount */}
                <div className="flex justify-between">
                  <span className="text-gray-600">مبلغ کل:</span>
                  <span className="font-medium">{orderDetails.totalAmount} تومان</span>
                </div>
                {/* هزینه ارسال - Shipping cost */}
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-medium">{orderDetails.shippingCost} تومان</span>
                </div>
                {/* تخفیف - Discount */}
                <div className="flex justify-between">
                  <span className="text-gray-600">تخفیف:</span>
                  <span className="font-medium text-green-600">-{orderDetails.discount} تومان</span>
                </div>
                {/* مبلغ نهایی - Final amount */}
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-900 font-semibold">مبلغ نهایی:</span>
                  <span className="font-bold text-lg">{orderDetails.finalAmount} تومان</span>
                </div>
              </div>
            </div>
          </div>

          {/* اطلاعات مشتری - Customer information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات مشتری</h2>
              <div className="space-y-4">
                {/* آواتار و نام مشتری - Customer avatar and name */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {orderDetails.customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{orderDetails.customer.name}</p>
                    <p className="text-sm text-gray-600">{orderDetails.customer.email}</p>
                  </div>
                </div>
                
                {/* اطلاعات تماس مشتری - Customer contact information */}
                <div className="space-y-3">
                  {/* شماره تلفن - Phone number */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{orderDetails.customer.phone}</span>
                  </div>
                  
                  {/* ایمیل - Email */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{orderDetails.customer.email}</span>
                  </div>
                  
                  {/* آدرس - Address */}
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-sm text-gray-600">{orderDetails.customer.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* کد رهگیری - Tracking code */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">کد رهگیری</h2>
              {orderDetails.trackingCode ? (
                /* نمایش کد رهگیری - Display tracking code */
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">{orderDetails.trackingCode}</p>
                  <p className="text-sm text-green-600 mt-1">سفارش ارسال شده است</p>
                </div>
              ) : (
                /* پیام عدم وجود کد رهگیری - No tracking code message */
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">هنوز کد رهگیری ثبت نشده است</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                    ثبت کد رهگیری
                  </button>
                </div>
              )}
            </div>

            {/* تاریخچه وضعیت - Status history */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">تاریخچه وضعیت</h2>
              <div className="space-y-3">
                {/* مرحله ثبت سفارش - Order registration step */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">سفارش ثبت شد</p>
                    <p className="text-xs text-gray-600">1403/01/15 - 14:30</p>
                  </div>
                </div>
                {/* مرحله تایید پرداخت - Payment confirmation step */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">پرداخت تایید شد</p>
                    <p className="text-xs text-gray-600">1403/01/15 - 14:35</p>
                  </div>
                </div>
                {/* مرحله پردازش - Processing step */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">در حال پردازش</p>
                    <p className="text-xs text-gray-600">1403/01/15 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
