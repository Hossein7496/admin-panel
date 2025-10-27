/**
 * صفحه مدیریت برندها - Brands Management Page
 * این صفحه برای مدیریت برندهای محصولات استفاده می‌شود
 * This page is used for managing product brands
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useState } from 'react';

// داده‌های نمونه برندها - Sample brands data
const brands = [
  {
    id: 1,
    name: 'Apple',                    // نام برند - Brand name
    logo: '/api/placeholder/60/60',  // لوگوی برند - Brand logo
    productsCount: 45,               // تعداد محصولات - Products count
    status: 'فعال',                  // وضعیت برند - Brand status
    description: 'برند اپل - تولیدکننده محصولات دیجیتال' // توضیحات - Description
  },
  {
    id: 2,
    name: 'Samsung',
    logo: '/api/placeholder/60/60',
    productsCount: 38,
    status: 'فعال',
    description: 'برند سامسونگ - تولیدکننده محصولات الکترونیکی'
  },
  {
    id: 3,
    name: 'HP',
    logo: '/api/placeholder/60/60',
    productsCount: 25,
    status: 'فعال',
    description: 'برند HP - تولیدکننده لپ‌تاپ و کامپیوتر'
  },
  {
    id: 4,
    name: 'Dell',
    logo: '/api/placeholder/60/60',
    productsCount: 22,
    status: 'فعال',
    description: 'برند Dell - تولیدکننده کامپیوتر و لپ‌تاپ'
  },
  {
    id: 5,
    name: 'Sony',
    logo: '/api/placeholder/60/60',
    productsCount: 18,
    status: 'غیرفعال',               // غیرفعال - Inactive
    description: 'برند سونی - تولیدکننده محصولات الکترونیکی'
  },
  {
    id: 6,
    name: 'Microsoft',
    logo: '/api/placeholder/60/60',
    productsCount: 15,
    status: 'فعال',
    description: 'برند مایکروسافت - تولیدکننده نرم‌افزار و سخت‌افزار'
  }
];

/**
 * تابع دریافت رنگ وضعیت برند - Get brand status color function
 * @param {string} status - وضعیت برند - Brand status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'فعال':                     // فعال - Active
      return 'bg-green-100 text-green-800';
    case 'غیرفعال':                  // غیرفعال - Inactive
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * کامپوننت مدیریت برندها - Brands Management Component
 * @returns {JSX.Element} - صفحه مدیریت برندها - Brands management page
 */
export default function Brands() {
  // حالت‌های کامپوننت - Component states
  const [showAddForm, setShowAddForm] = useState(false);        // نمایش فرم افزودن - Show add form
  const [editingBrand, setEditingBrand] = useState(null);       // برند در حال ویرایش - Brand being edited
  const [searchTerm, setSearchTerm] = useState('');             // عبارت جستجو - Search term
  const [statusFilter, setStatusFilter] = useState('');        // فیلتر وضعیت - Status filter

  // فیلتر کردن برندها بر اساس جستجو و وضعیت - Filter brands based on search and status
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || brand.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /**
   * تابع ویرایش برند - Edit brand function
   * @param {Object} brand - برند مورد نظر - Target brand
   */
  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setShowAddForm(true);
  };

  /**
   * تابع حذف برند - Delete brand function
   * @param {number} brandId - شناسه برند - Brand ID
   */
  const handleDelete = (brandId) => {
    if (confirm('آیا از حذف این برند اطمینان دارید؟')) {
      console.log('Delete brand:', brandId);
    }
  };

  /**
   * تابع افزودن برند جدید - Add new brand function
   */
  const handleAddBrand = () => {
    setEditingBrand(null);
    setShowAddForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* هدر صفحه - Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت برندها</h1>
          {/* دکمه افزودن برند جدید - Add new brand button */}
          <button
            onClick={handleAddBrand}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن برند جدید
          </button>
        </div>

        {/* بخش فیلترها و جستجو - Filters and Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* فیلد جستجو - Search field */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در برندها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* فیلتر وضعیت - Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
            
            {/* دکمه اعمال فیلتر - Apply filter button */}
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* فرم افزودن/ویرایش برند - Add/Edit Brand Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingBrand ? 'ویرایش برند' : 'افزودن برند جدید'}
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* فیلد نام برند - Brand name field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام برند *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingBrand?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام برند"
                  />
                </div>
                
                {/* فیلد وضعیت - Status field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
              </div>
              
              {/* فیلد توضیحات - Description field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  defaultValue={editingBrand?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات برند"
                />
              </div>
              
              {/* بخش آپلود لوگو - Logo upload section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  لوگوی برند
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">لوگو</span>
                  </div>
                  <p className="text-gray-600">لوگوی برند را اینجا بکشید یا کلیک کنید</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, SVG تا 2MB</p>
                </div>
              </div>
              
              {/* دکمه‌های عملیات - Action buttons */}
              <div className="flex items-center justify-end space-x-3 space-x-reverse">
                {/* دکمه انصراف - Cancel button */}
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  انصراف
                </button>
                {/* دکمه ذخیره - Save button */}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBrand ? 'ویرایش' : 'افزودن'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* جدول برندها - Brands Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    لوگو
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نام برند
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تعداد محصولات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    توضیحات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50">
                    {/* لوگوی برند - Brand logo */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">لوگو</span>
                      </div>
                    </td>
                    {/* نام برند - Brand name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                    </td>
                    {/* تعداد محصولات - Products count */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{brand.productsCount} محصول</div>
                    </td>
                    {/* وضعیت برند - Brand status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(brand.status)}`}>
                        {brand.status}
                      </span>
                    </td>
                    {/* توضیحات برند - Brand description */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {brand.description}
                      </div>
                    </td>
                    {/* دکمه‌های عملیات - Action buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {/* دکمه ویرایش - Edit button */}
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* دکمه حذف - Delete button */}
                        <button
                          onClick={() => handleDelete(brand.id)}
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
              نمایش 1 تا {filteredBrands.length} از {brands.length} برند
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
