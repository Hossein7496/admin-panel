/**
 * صفحه افزودن محصول جدید - Add New Product Page
 * این صفحه برای افزودن محصول جدید به سیستم استفاده می‌شود
 * This page is used for adding new products to the system
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { useState } from 'react';
import { Save, X, Plus, Upload } from 'lucide-react';
import Link from 'next/link';

/**
 * کامپوننت افزودن محصول - Add Product Component
 * @returns {JSX.Element} - صفحه افزودن محصول - Add product page
 */
export default function AddProduct() {
  // داده‌های فرم - Form data
  const [formData, setFormData] = useState({
    name: '', // نام محصول فارسی - Persian product name
    nameEn: '', // نام محصول انگلیسی - English product name
    description: '', // توضیحات کوتاه - Short description
    fullDescription: '', // توضیحات کامل - Full description
    slug: '', // URL محصول - Product URL
    price: '', // قیمت اصلی - Main price
    discountPrice: '', // قیمت با تخفیف - Discount price
    sku: '', // کد محصول - Product SKU
    stock: '', // موجودی انبار - Stock quantity
    category: '', // دسته‌بندی - Category
    brand: '', // برند - Brand
    status: 'active', // وضعیت محصول - Product status
    metaTitle: '', // عنوان سئو - SEO title
    metaDescription: '', // توضیحات سئو - SEO description
    keywords: '' // کلمات کلیدی - Keywords
  });

  // آرایه‌های کمکی - Helper arrays
  const [variations, setVariations] = useState([]); // تنوع‌های محصول - Product variations
  const [attributes, setAttributes] = useState([]); // ویژگی‌های محصول - Product attributes
  const [images, setImages] = useState([]); // تصاویر محصول - Product images

  /**
   * تابع تغییر ورودی فرم - Form input change function
   * @param {Event} e - رویداد تغییر - Change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * تابع افزودن تنوع محصول - Add product variation function
   */
  const addVariation = () => {
    setVariations([...variations, { name: '', price: '', stock: '', attributes: {} }]);
  };

  /**
   * تابع حذف تنوع محصول - Remove product variation function
   * @param {number} index - ایندکس تنوع - Variation index
   */
  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  /**
   * تابع افزودن ویژگی محصول - Add product attribute function
   */
  const addAttribute = () => {
    setAttributes([...attributes, { name: '', value: '' }]);
  };

  /**
   * تابع حذف ویژگی محصول - Remove product attribute function
   * @param {number} index - ایندکس ویژگی - Attribute index
   */
  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  /**
   * تابع ارسال فرم - Form submit function
   * @param {Event} e - رویداد ارسال - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // در اینجا داده‌ها را به سرور ارسال می‌کنیم - Here we send data to server
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">افزودن محصول جدید</h1>
          <Link
            href="/products"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            <X className="w-4 h-4 ml-2" />
            انصراف
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* اطلاعات پایه */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات پایه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام محصول (فارسی) *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام محصول (انگلیسی)
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کوتاه
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کامل
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL محصول (Slug) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* قیمت‌گذاری */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">قیمت‌گذاری</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت اصلی (تومان) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت با تخفیف (تومان)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* موجودی و انبار */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">موجودی و انبار</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کد محصول (SKU) *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موجودی انبار *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضعیت محصول
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                  <option value="out_of_stock">ناموجود</option>
                </select>
              </div>
            </div>
          </div>

          {/* دسته‌بندی و برند */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">دسته‌بندی و برند</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  <option value="موبایل">موبایل</option>
                  <option value="لپ‌تاپ">لپ‌تاپ</option>
                  <option value="تبلت">تبلت</option>
                  <option value="لوازم جانبی">لوازم جانبی</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  برند
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">انتخاب برند</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                </select>
              </div>
            </div>
          </div>

          {/* تصاویر */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">تصاویر محصول</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">تصاویر محصول را اینجا بکشید یا کلیک کنید</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF تا 10MB</p>
            </div>
          </div>

          {/* ویژگی‌ها */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">ویژگی‌ها و مشخصات فنی</h2>
              <button
                type="button"
                onClick={addAttribute}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
              >
                <Plus className="w-4 h-4 ml-1" />
                افزودن ویژگی
              </button>
            </div>
            
            <div className="space-y-3">
              {attributes.map((attr, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="text"
                    placeholder="نام ویژگی"
                    value={attr.name}
                    onChange={(e) => {
                      const newAttrs = [...attributes];
                      newAttrs[index].name = e.target.value;
                      setAttributes(newAttrs);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="مقدار"
                    value={attr.value}
                    onChange={(e) => {
                      const newAttrs = [...attributes];
                      newAttrs[index].value = e.target.value;
                      setAttributes(newAttrs);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* تنظیمات سئو */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">تنظیمات سئو</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان سئو (Meta Title)
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات متا (Meta Description)
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کلمات کلیدی
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="کلمات کلیدی را با کاما جدا کنید"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* دکمه‌های عملیات */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse">
            <Link
              href="/products"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              انصراف
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 ml-2" />
              ذخیره محصول
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
