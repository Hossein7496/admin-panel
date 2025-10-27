/**
 * صفحه مدیریت محتوا - Content Management Page
 * این صفحه برای مدیریت صفحات و بنرهای سایت استفاده می‌شود
 * This page is used for managing site pages and banners
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Plus, Edit, Trash2, Search, Filter, FileText, Image, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

// داده‌های نمونه صفحات - Sample pages data
const pages = [
  {
    id: 1,
    title: 'درباره ما',
    slug: 'about-us',
    type: 'صفحه',
    status: 'منتشر شده',
    lastModified: '1403/01/15',
    views: 1250
  },
  {
    id: 2,
    title: 'تماس با ما',
    slug: 'contact-us',
    type: 'صفحه',
    status: 'منتشر شده',
    lastModified: '1403/01/14',
    views: 890
  },
  {
    id: 3,
    title: 'قوانین و مقررات',
    slug: 'terms-conditions',
    type: 'صفحه',
    status: 'پیش‌نویس',
    lastModified: '1403/01/13',
    views: 450
  },
  {
    id: 4,
    title: 'حریم خصوصی',
    slug: 'privacy-policy',
    type: 'صفحه',
    status: 'منتشر شده',
    lastModified: '1403/01/12',
    views: 320
  },
  {
    id: 5,
    title: 'راهنمای خرید',
    slug: 'shopping-guide',
    type: 'صفحه',
    status: 'منتشر شده',
    lastModified: '1403/01/11',
    views: 680
  }
];

// داده‌های نمونه بنرها
const banners = [
  {
    id: 1,
    title: 'بنر اصلی صفحه اصلی',
    position: 'اسلایدر',
    status: 'فعال',
    image: '/api/placeholder/300/150',
    link: '/products',
    startDate: '1403/01/01',
    endDate: '1403/12/29'
  },
  {
    id: 2,
    title: 'بنر تخفیف ویژه',
    position: 'بالای صفحه',
    status: 'فعال',
    image: '/api/placeholder/300/100',
    link: '/discounts',
    startDate: '1403/01/15',
    endDate: '1403/01/25'
  },
  {
    id: 3,
    title: 'بنر محصولات جدید',
    position: 'کنار صفحه',
    status: 'غیرفعال',
    image: '/api/placeholder/200/300',
    link: '/products/new',
    startDate: '1403/01/10',
    endDate: '1403/02/10'
  }
];

/**
 * تابع دریافت رنگ وضعیت - Get status color function
 * @param {string} status - وضعیت - Status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'منتشر شده': // Published
    case 'فعال': // Active
      return 'bg-green-100 text-green-800';
    case 'پیش‌نویس': // Draft
    case 'غیرفعال': // Inactive
      return 'bg-gray-100 text-gray-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * کامپوننت مدیریت محتوا - Content Management Component
 * @returns {JSX.Element} - صفحه مدیریت محتوا - Content management page
 */
export default function ContentManagement() {
  // حالت‌های کامپوننت - Component states
  const [activeTab, setActiveTab] = useState('pages'); // تب فعال - Active tab
  const [showAddForm, setShowAddForm] = useState(false); // نمایش فرم افزودن - Show add form
  const [editingItem, setEditingItem] = useState(null); // آیتم در حال ویرایش - Item being edited
  const [searchTerm, setSearchTerm] = useState(''); // عبارت جستجو - Search term
  const [statusFilter, setStatusFilter] = useState(''); // فیلتر وضعیت - Status filter

  // فیلتر کردن صفحات - Filter pages
  const filteredPages = pages.filter(page => {
    // تطبیق با عبارت جستجو - Match with search term
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    // تطبیق با فیلتر وضعیت - Match with status filter
    const matchesStatus = statusFilter === '' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // فیلتر کردن بنرها - Filter banners
  const filteredBanners = banners.filter(banner => {
    // تطبیق با عبارت جستجو - Match with search term
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase());
    // تطبیق با فیلتر وضعیت - Match with status filter
    const matchesStatus = statusFilter === '' || banner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /**
   * تابع ویرایش آیتم - Edit item function
   * @param {Object} item - آیتم - Item
   */
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  /**
   * تابع حذف آیتم - Delete item function
   * @param {number} itemId - شناسه آیتم - Item ID
   */
  const handleDelete = (itemId) => {
    if (confirm('آیا از حذف این آیتم اطمینان دارید؟')) {
      console.log('Delete item:', itemId);
    }
  };

  /**
   * تابع افزودن آیتم جدید - Add new item function
   */
  const handleAddItem = () => {
    setEditingItem(null);
    setShowAddForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت محتوا</h1>
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            {activeTab === 'pages' ? 'افزودن صفحه جدید' : 'افزودن بنر جدید'}
          </button>
        </div>

        {/* تب‌ها */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab('pages')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'pages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 inline ml-2" />
                صفحات
              </button>
              <button
                onClick={() => setActiveTab('banners')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'banners'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Image className="w-4 h-4 inline ml-2" />
                بنرها
              </button>
            </nav>
          </div>

          {/* فیلترها و جستجو */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`جستجو در ${activeTab === 'pages' ? 'صفحات' : 'بنرها'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="منتشر شده">منتشر شده</option>
                <option value="پیش‌نویس">پیش‌نویس</option>
                <option value="فعال">فعال</option>
                <option value="غیرفعال">غیرفعال</option>
              </select>
              
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 ml-2" />
                فیلتر
              </button>
            </div>
          </div>

          {/* محتوای تب‌ها */}
          <div className="p-6">
            {activeTab === 'pages' ? (
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 ml-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">{page.title}</h3>
                        <p className="text-sm text-gray-500">{page.slug}</p>
                        <p className="text-sm text-gray-500">آخرین ویرایش: {page.lastModified}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <span className="text-sm text-gray-600">{page.views} بازدید</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(page)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBanners.map((banner) => (
                  <div key={banner.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-16 h-10 bg-gray-200 rounded-lg flex items-center justify-center ml-3">
                        <Image className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{banner.title}</h3>
                        <p className="text-sm text-gray-500">موقعیت: {banner.position}</p>
                        <p className="text-sm text-gray-500">لینک: {banner.link}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-sm text-gray-600">
                        <p>{banner.startDate} - {banner.endDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(banner.status)}`}>
                        {banner.status}
                      </span>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(banner)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* فرم افزودن/ویرایش */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingItem ? `ویرایش ${activeTab === 'pages' ? 'صفحه' : 'بنر'}` : `افزودن ${activeTab === 'pages' ? 'صفحه' : 'بنر'} جدید`}
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.title || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="عنوان صفحه یا بنر"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL (Slug) *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.slug || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="page-slug"
                  />
                </div>
                
                {activeTab === 'banners' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        موقعیت بنر
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="slider">اسلایدر</option>
                        <option value="top">بالای صفحه</option>
                        <option value="sidebar">کنار صفحه</option>
                        <option value="bottom">پایین صفحه</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        لینک بنر
                      </label>
                      <input
                        type="url"
                        defaultValue={editingItem?.link || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="published">منتشر شده</option>
                    <option value="draft">پیش‌نویس</option>
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محتوا
                </label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="محتوای صفحه یا توضیحات بنر"
                />
              </div>
              
              {activeTab === 'banners' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تصویر بنر
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">تصویر بنر را اینجا بکشید یا کلیک کنید</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF تا 5MB</p>
                  </div>
                </div>
              )}
              
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
                  {editingItem ? 'ویرایش' : 'افزودن'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
