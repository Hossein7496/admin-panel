/**
 * صفحه مدیریت محصولات - Products Management Page
 * این صفحه برای نمایش، جستجو و مدیریت محصولات استفاده می‌شود
 * This page is used for displaying, searching and managing products
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import Link from 'next/link';

// داده‌های نمونه محصولات - Sample products data
const products = [
  {
    id: 1,
    name: 'آیفون 15 پرو مکس',        // iPhone 15 Pro Max
    sku: 'IPH15PM-256',             // Product SKU
    price: '45,000,000',            // Product price
    stock: 12,                      // Stock quantity
    category: 'موبایل',             // Mobile category
    status: 'فعال',                 // Active status
    image: '/api/placeholder/60/60'  // Product image
  },
  {
    id: 2,
    name: 'مک‌بوک پرو 16 اینچ',      // MacBook Pro 16 inch
    sku: 'MBP16-512',
    price: '85,000,000',
    stock: 5,
    category: 'لپ‌تاپ',             // Laptop category
    status: 'فعال',
    image: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'سامسونگ گلکسی S24',      // Samsung Galaxy S24
    sku: 'SGS24-128',
    price: '28,000,000',
    stock: 0,
    category: 'موبایل',
    status: 'ناموجود',              // Out of stock
    image: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'ایپد پرو 12.9 اینچ',      // iPad Pro 12.9 inch
    sku: 'IPADP-256',
    price: '35,000,000',
    stock: 8,
    category: 'تبلت',               // Tablet category
    status: 'فعال',
    image: '/api/placeholder/60/60'
  },
  {
    id: 5,
    name: 'ایرپادز پرو',             // AirPods Pro
    sku: 'APP-2',
    price: '8,500,000',
    stock: 15,
    category: 'لوازم جانبی',        // Accessories category
    status: 'فعال',
    image: '/api/placeholder/60/60'
  },
];

/**
 * کامپوننت مدیریت محصولات - Products Management Component
 * @returns {JSX.Element} - صفحه مدیریت محصولات - Products management page
 */
export default function Products() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h1>
          {/* دکمه افزودن محصول جدید - Add new product button */}
          <Link
            href="/products/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن محصول جدید
          </Link>
        </div>

        {/* بخش فیلترها و جستجو - Filters and Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* فیلد جستجو - Search field */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* فیلتر دسته‌بندی - Category filter */}
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">همه دسته‌بندی‌ها</option>
              <option value="موبایل">موبایل</option>
              <option value="لپ‌تاپ">لپ‌تاپ</option>
              <option value="تبلت">تبلت</option>
              <option value="لوازم جانبی">لوازم جانبی</option>
            </select>
            
            {/* فیلتر وضعیت - Status filter */}
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">همه وضعیت‌ها</option>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
              <option value="ناموجود">ناموجود</option>
            </select>
            
            {/* دکمه اعمال فیلتر - Apply filter button */}
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* جدول محصولات - Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تصویر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نام محصول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کد محصول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    قیمت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    موجودی
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    دسته‌بندی
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
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* تصویر محصول - Product image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">تصویر</span>
                      </div>
                    </td>
                    {/* نام محصول - Product name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    {/* کد محصول - Product SKU */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    {/* قیمت محصول - Product price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price} تومان</div>
                    </td>
                    {/* موجودی محصول - Product stock */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.stock === 0 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock <= 5 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock} عدد
                      </span>
                    </td>
                    {/* دسته‌بندی محصول - Product category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    {/* وضعیت محصول - Product status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === 'فعال' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'ناموجود'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    {/* دکمه‌های عملیات - Action buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {/* دکمه مشاهده - View button */}
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* دکمه ویرایش - Edit button */}
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* دکمه حذف - Delete button */}
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
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
              نمایش 1 تا 5 از 25 محصول
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
