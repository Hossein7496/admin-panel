/**
 * صفحه مدیریت دسته‌بندی‌ها - Categories Management Page
 * این صفحه برای مدیریت دسته‌بندی‌های محصولات استفاده می‌شود
 * This page is used for managing product categories
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Plus, Edit, Trash2, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// داده‌های نمونه دسته‌بندی‌ها - Sample categories data
const categories = [
  {
    id: 1,
    name: 'کالای دیجیتال',
    slug: 'digital-products',
    parentId: null,
    level: 0,
    productsCount: 150,
    status: 'فعال',
    children: [
      {
        id: 2,
        name: 'موبایل و تبلت',
        slug: 'mobile-tablet',
        parentId: 1,
        level: 1,
        productsCount: 80,
        status: 'فعال',
        children: [
          {
            id: 3,
            name: 'موبایل',
            slug: 'mobile',
            parentId: 2,
            level: 2,
            productsCount: 50,
            status: 'فعال',
            children: []
          },
          {
            id: 4,
            name: 'تبلت',
            slug: 'tablet',
            parentId: 2,
            level: 2,
            productsCount: 30,
            status: 'فعال',
            children: []
          }
        ]
      },
      {
        id: 5,
        name: 'لپ‌تاپ و کامپیوتر',
        slug: 'laptop-computer',
        parentId: 1,
        level: 1,
        productsCount: 70,
        status: 'فعال',
        children: [
          {
            id: 6,
            name: 'لپ‌تاپ',
            slug: 'laptop',
            parentId: 5,
            level: 2,
            productsCount: 45,
            status: 'فعال',
            children: []
          },
          {
            id: 7,
            name: 'کامپیوتر',
            slug: 'computer',
            parentId: 5,
            level: 2,
            productsCount: 25,
            status: 'فعال',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'لوازم جانبی',
    slug: 'accessories',
    parentId: null,
    level: 0,
    productsCount: 200,
    status: 'فعال',
    children: [
      {
        id: 9,
        name: 'هدفون و هندزفری',
        slug: 'headphones',
        parentId: 8,
        level: 1,
        productsCount: 80,
        status: 'فعال',
        children: []
      },
      {
        id: 10,
        name: 'کیف و کاور',
        slug: 'cases-covers',
        parentId: 8,
        level: 1,
        productsCount: 120,
        status: 'فعال',
        children: []
      }
    ]
  }
];

/**
 * کامپوننت آیتم دسته‌بندی - Category Item Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {Object} props.category - اطلاعات دسته‌بندی - Category information
 * @param {Function} props.onEdit - تابع ویرایش - Edit function
 * @param {Function} props.onDelete - تابع حذف - Delete function
 * @param {Function} props.onToggle - تابع تغییر وضعیت - Toggle function
 * @returns {JSX.Element} - آیتم دسته‌بندی - Category item
 */
function CategoryItem({ category, onEdit, onDelete, onToggle }) {
  // حالت باز/بسته بودن دسته‌بندی - Category expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * تابع تغییر وضعیت باز/بسته بودن - Toggle expanded state function
   */
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(category.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50">
        <div className="flex items-center flex-1">
          {category.children && category.children.length > 0 && (
            <button
              onClick={handleToggle}
              className="mr-3 p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          <div className="flex items-center">
            <FolderOpen className="w-5 h-5 text-blue-600 ml-3" />
            <div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.slug}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm text-gray-600">{category.productsCount} محصول</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            category.status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {category.status}
          </span>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => onEdit(category)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && category.children && category.children.length > 0 && (
        <div className="mr-8 border-t border-gray-200">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * کامپوننت مدیریت دسته‌بندی‌ها - Categories Management Component
 * @returns {JSX.Element} - صفحه مدیریت دسته‌بندی‌ها - Categories management page
 */
export default function Categories() {
  // حالت‌های کامپوننت - Component states
  const [showAddForm, setShowAddForm] = useState(false); // نمایش فرم افزودن - Show add form
  const [editingCategory, setEditingCategory] = useState(null); // دسته‌بندی در حال ویرایش - Category being edited

  /**
   * تابع ویرایش دسته‌بندی - Edit category function
   * @param {Object} category - اطلاعات دسته‌بندی - Category information
   */
  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowAddForm(true);
  };

  /**
   * تابع حذف دسته‌بندی - Delete category function
   * @param {number} categoryId - شناسه دسته‌بندی - Category ID
   */
  const handleDelete = (categoryId) => {
    if (confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      console.log('Delete category:', categoryId);
    }
  };

  /**
   * تابع افزودن دسته‌بندی جدید - Add new category function
   */
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowAddForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت دسته‌بندی‌ها</h1>
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن دسته‌بندی جدید
          </button>
        </div>

        {/* فرم افزودن/ویرایش */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام دسته‌بندی *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="نام دسته‌بندی"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL دسته‌بندی (Slug) *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.slug || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="category-slug"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی مادر
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">بدون دسته‌بندی مادر</option>
                    <option value="1">کالای دیجیتال</option>
                    <option value="8">لوازم جانبی</option>
                  </select>
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات دسته‌بندی"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تصویر دسته‌بندی
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-600">تصویر دسته‌بندی را اینجا بکشید یا کلیک کنید</p>
                </div>
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
                  {editingCategory ? 'ویرایش' : 'افزودن'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* لیست دسته‌بندی‌ها */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">لیست دسته‌بندی‌ها</h2>
            
            <div className="space-y-2">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
