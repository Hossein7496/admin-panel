/**
 * صفحه مدیریت کدهای تخفیف - Discount Codes Management Page
 * این صفحه برای مدیریت کدهای تخفیف استفاده می‌شود
 * This page is used for managing discount codes
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import PersianDatePicker from '@/components/PersianDatePicker';
import { Plus, Edit, Trash2, Search, Filter, Percent, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import { getTodayPersian } from '@/utils/persianDate';

// داده‌های نمونه کدهای تخفیف - Sample discount codes data
const discountCodes = [
  {
    id: 1, // شناسه کد تخفیف - Discount code ID
    code: 'WELCOME20', // کد تخفیف - Discount code
    type: 'درصدی', // نوع تخفیف - Discount type
    value: '20', // مقدار تخفیف - Discount value
    description: 'تخفیف خوش‌آمدگویی برای مشتریان جدید', // توضیحات - Description
    startDate: '1403/01/01', // تاریخ شروع - Start date
    endDate: '1403/12/29', // تاریخ انقضا - End date
    usageLimit: 1000, // محدودیت استفاده - Usage limit
    usedCount: 245, // تعداد استفاده شده - Used count
    minOrderAmount: '500,000', // حداقل مبلغ سفارش - Minimum order amount
    maxDiscountAmount: '1,000,000', // حداکثر تخفیف - Maximum discount amount
    status: 'فعال', // وضعیت - Status
    applicableProducts: 'همه محصولات' // محصولات قابل استفاده - Applicable products
  },
  {
    id: 2,
    code: 'BLACKFRIDAY50',
    type: 'درصدی',
    value: '50',
    description: 'تخفیف ویژه جمعه سیاه',
    startDate: '1403/01/15',
    endDate: '1403/01/20',
    usageLimit: 500,
    usedCount: 500,
    minOrderAmount: '1,000,000',
    maxDiscountAmount: '2,000,000',
    status: 'منقضی شده',
    applicableProducts: 'کالای دیجیتال'
  },
  {
    id: 3,
    code: 'FIXED100K',
    type: 'مبلغ ثابت',
    value: '100,000',
    description: 'تخفیف ثابت 100 هزار تومانی',
    startDate: '1403/01/10',
    endDate: '1403/02/10',
    usageLimit: 200,
    usedCount: 89,
    minOrderAmount: '300,000',
    maxDiscountAmount: '100,000',
    status: 'فعال',
    applicableProducts: 'لوازم جانبی'
  },
  {
    id: 4,
    code: 'STUDENT15',
    type: 'درصدی',
    value: '15',
    description: 'تخفیف دانشجویی',
    startDate: '1403/01/05',
    endDate: '1403/06/05',
    usageLimit: 1000,
    usedCount: 156,
    minOrderAmount: '200,000',
    maxDiscountAmount: '500,000',
    status: 'فعال',
    applicableProducts: 'همه محصولات'
  },
  {
    id: 5,
    code: 'VIP30',
    type: 'درصدی',
    value: '30',
    description: 'تخفیف ویژه اعضای VIP',
    startDate: '1403/01/01',
    endDate: '1403/12/29',
    usageLimit: 100,
    usedCount: 23,
    minOrderAmount: '2,000,000',
    maxDiscountAmount: '5,000,000',
    status: 'غیرفعال',
    applicableProducts: 'همه محصولات'
  }
];

/**
 * تابع دریافت رنگ وضعیت کد تخفیف - Get discount code status color function
 * @param {string} status - وضعیت کد تخفیف - Discount code status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'فعال': // Active
      return 'bg-green-100 text-green-800';
    case 'غیرفعال': // Inactive
      return 'bg-gray-100 text-gray-800';
    case 'منقضی شده': // Expired
      return 'bg-red-100 text-red-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * تابع دریافت رنگ نوع تخفیف - Get discount type color function
 * @param {string} type - نوع تخفیف - Discount type
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getTypeColor = (type) => {
  switch (type) {
    case 'درصدی': // Percentage
      return 'bg-blue-100 text-blue-800';
    case 'مبلغ ثابت': // Fixed amount
      return 'bg-purple-100 text-purple-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * کامپوننت مدیریت کدهای تخفیف - Discount Codes Management Component
 * @returns {JSX.Element} - صفحه مدیریت کدهای تخفیف - Discount codes management page
 */
export default function DiscountCodes() {
  // حالت‌های کامپوننت - Component states
  const [showAddForm, setShowAddForm] = useState(false); // نمایش فرم افزودن - Show add form
  const [editingCode, setEditingCode] = useState(null); // کد در حال ویرایش - Code being edited
  const [searchTerm, setSearchTerm] = useState(''); // عبارت جستجو - Search term
  const [statusFilter, setStatusFilter] = useState(''); // فیلتر وضعیت - Status filter
  const [typeFilter, setTypeFilter] = useState(''); // فیلتر نوع - Type filter
  
  // داده‌های فرم - Form data
  const [formData, setFormData] = useState({
    code: '', // کد تخفیف - Discount code
    type: 'درصدی', // نوع تخفیف - Discount type
    value: '', // مقدار تخفیف - Discount value
    description: '', // توضیحات - Description
    startDate: getTodayPersian(), // تاریخ شروع - Start date
    endDate: '', // تاریخ انقضا - End date
    usageLimit: '', // محدودیت استفاده - Usage limit
    usedCount: 0, // تعداد استفاده شده - Used count
    minOrderAmount: '', // حداقل مبلغ سفارش - Minimum order amount
    maxDiscountAmount: '', // حداکثر تخفیف - Maximum discount amount
    status: 'فعال', // وضعیت - Status
    applicableProducts: 'همه محصولات' // محصولات قابل استفاده - Applicable products
  });

  // فیلتر کردن کدهای تخفیف - Filter discount codes
  const filteredCodes = discountCodes.filter(code => {
    // تطبیق با عبارت جستجو - Match with search term
    const matchesSearch = 
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // تطبیق با فیلتر وضعیت - Match with status filter
    const matchesStatus = statusFilter === '' || code.status === statusFilter;
    // تطبیق با فیلتر نوع - Match with type filter
    const matchesType = typeFilter === '' || code.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  /**
   * تابع ویرایش کد تخفیف - Edit discount code function
   * @param {Object} code - کد تخفیف - Discount code
   */
  const handleEdit = (code) => {
    setEditingCode(code);
    setShowAddForm(true);
  };

  /**
   * تابع حذف کد تخفیف - Delete discount code function
   * @param {number} codeId - شناسه کد تخفیف - Discount code ID
   */
  const handleDelete = (codeId) => {
    if (confirm('آیا از حذف این کد تخفیف اطمینان دارید؟')) {
      console.log('Delete code:', codeId);
    }
  };

  /**
   * تابع افزودن کد تخفیف جدید - Add new discount code function
   */
  const handleAddCode = () => {
    setEditingCode(null);
    setShowAddForm(true);
  };

  /**
   * تابع محاسبه درصد استفاده - Calculate usage percentage function
   * @param {number} used - تعداد استفاده شده - Used count
   * @param {number} limit - محدودیت استفاده - Usage limit
   * @returns {number} - درصد استفاده - Usage percentage
   */
  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کدهای تخفیف</h1>
          <button
            onClick={handleAddCode}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن کد تخفیف جدید
          </button>
        </div>

        {/* فیلترها و جستجو */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="جستجو در کدهای تخفیف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
              <option value="منقضی شده">منقضی شده</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه انواع</option>
              <option value="درصدی">درصدی</option>
              <option value="مبلغ ثابت">مبلغ ثابت</option>
            </select>
            
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* فرم افزودن/ویرایش */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCode ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف جدید'}
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    کد تخفیف *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCode?.code || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: WELCOME20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع تخفیف *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="percentage">درصدی</option>
                    <option value="fixed">مبلغ ثابت</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مقدار تخفیف *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCode?.value || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20 یا 100,000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاریخ شروع *
                  </label>
                  <PersianDatePicker
                    value={formData.startDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                    placeholder="تاریخ شروع را انتخاب کنید"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاریخ انقضا *
                  </label>
                  <PersianDatePicker
                    value={formData.endDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                    placeholder="تاریخ انقضا را انتخاب کنید"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    محدودیت استفاده
                  </label>
                  <input
                    type="number"
                    defaultValue={editingCode?.usageLimit || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حداقل مبلغ سفارش
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCode?.minOrderAmount || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500,000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حداکثر تخفیف
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCode?.maxDiscountAmount || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1,000,000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    محصولات قابل استفاده
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">همه محصولات</option>
                    <option value="digital">کالای دیجیتال</option>
                    <option value="accessories">لوازم جانبی</option>
                    <option value="mobile">موبایل</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  defaultValue={editingCode?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات کد تخفیف"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCode ? 'ویرایش' : 'افزودن'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* جدول کدهای تخفیف */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کد تخفیف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نوع و مقدار
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ انقضا
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    استفاده
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
                {filteredCodes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{code.code}</div>
                      <div className="text-sm text-gray-500">{code.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(code.type)}`}>
                          {code.type}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{code.value}</span>
                      </div>
                      <div className="text-sm text-gray-500">حداقل: {code.minOrderAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{code.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{code.usedCount} / {code.usageLimit}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${getUsagePercentage(code.usedCount, code.usageLimit)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(code.status)}`}>
                        {code.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(code)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(code.id)}
                          className="text-red-600 hover:text-red-900"
                        >
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
              نمایش 1 تا {filteredCodes.length} از {discountCodes.length} کد تخفیف
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

        {/* آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Percent className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">کل کدهای تخفیف</p>
                <p className="text-2xl font-bold text-gray-900">{discountCodes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">کدهای فعال</p>
                <p className="text-2xl font-bold text-gray-900">
                  {discountCodes.filter(c => c.status === 'فعال').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">کل استفاده‌ها</p>
                <p className="text-2xl font-bold text-gray-900">
                  {discountCodes.reduce((sum, code) => sum + code.usedCount, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">کدهای منقضی</p>
                <p className="text-2xl font-bold text-gray-900">
                  {discountCodes.filter(c => c.status === 'منقضی شده').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
