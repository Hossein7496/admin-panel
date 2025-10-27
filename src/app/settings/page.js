/**
 * صفحه تنظیمات سیستم - System Settings Page
 * این صفحه برای تنظیمات کلی سیستم استفاده می‌شود
 * This page is used for general system settings
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Save, Upload, Settings as SettingsIcon, Store, CreditCard, Truck, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

/**
 * کامپوننت تنظیمات سیستم - System Settings Component
 * @returns {JSX.Element} - صفحه تنظیمات سیستم - System settings page
 */
export default function Settings() {
  // حالت‌های کامپوننت - Component states
  const [activeTab, setActiveTab] = useState('general'); // تب فعال - Active tab
  
  // داده‌های فرم - Form data
  const [formData, setFormData] = useState({
    // تنظیمات کلی - General settings
    storeName: 'فروشگاه دیجیتال', // نام فروشگاه - Store name
    storeDescription: 'بهترین فروشگاه آنلاین محصولات دیجیتال', // توضیحات فروشگاه - Store description
    storeEmail: 'info@store.com', // ایمیل فروشگاه - Store email
    storePhone: '021-12345678', // شماره تلفن فروشگاه - Store phone
    storeAddress: 'تهران، خیابان ولیعصر، پلاک 123', // آدرس فروشگاه - Store address
    storeLogo: '', // لوگوی فروشگاه - Store logo
    
    // تنظیمات درگاه پرداخت - Payment gateway settings
    paymentGateway: 'zarinpal', // درگاه پرداخت - Payment gateway
    merchantId: '', // شناسه مرچنت - Merchant ID
    apiKey: '', // کلید API - API key
    callbackUrl: '', // URL بازگشت - Callback URL
    
    // تنظیمات ارسال - Shipping settings
    shippingMethods: [ // روش‌های ارسال - Shipping methods
      { name: 'پست پیشتاز', cost: '50000', active: true },
      { name: 'تیپاکس', cost: '40000', active: true },
      { name: 'پیک موتوری', cost: '30000', active: false }
    ],
    
    // تنظیمات ایمیل - Email settings
    smtpHost: 'smtp.gmail.com', // هاست SMTP - SMTP host
    smtpPort: '587', // پورت SMTP - SMTP port
    smtpUsername: '', // نام کاربری SMTP - SMTP username
    smtpPassword: '', // رمز عبور SMTP - SMTP password
    fromEmail: 'noreply@store.com', // ایمیل فرستنده - From email
    fromName: 'فروشگاه دیجیتال' // نام فرستنده - From name
  });

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
   * تابع تغییر روش ارسال - Shipping method change function
   * @param {number} index - ایندکس روش - Method index
   * @param {string} field - فیلد - Field
   * @param {string|boolean} value - مقدار - Value
   */
  const handleShippingMethodChange = (index, field, value) => {
    const newMethods = [...formData.shippingMethods];
    newMethods[index][field] = value;
    setFormData(prev => ({
      ...prev,
      shippingMethods: newMethods
    }));
  };

  /**
   * تابع ارسال فرم - Form submit function
   * @param {Event} e - رویداد ارسال - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
  };

  // آرایه تب‌ها - Tabs array
  const tabs = [
    { id: 'general', name: 'تنظیمات کلی', icon: Store }, // General settings
    { id: 'payment', name: 'درگاه پرداخت', icon: CreditCard }, // Payment gateway
    { id: 'shipping', name: 'روش‌های ارسال', icon: Truck }, // Shipping methods
    { id: 'email', name: 'تنظیمات ایمیل', icon: Mail } // Email settings
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">تنظیمات سیستم</h1>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 ml-2" />
            ذخیره تنظیمات
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* تب‌ها */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 ml-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* محتوای تب‌ها */}
          <div className="p-6">
            {activeTab === 'general' && (
              <form className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">اطلاعات فروشگاه</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام فروشگاه *
                      </label>
                      <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل فروشگاه *
                      </label>
                      <input
                        type="email"
                        name="storeEmail"
                        value={formData.storeEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره تماس *
                      </label>
                      <input
                        type="tel"
                        name="storePhone"
                        value={formData.storePhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        آدرس فروشگاه
                      </label>
                      <input
                        type="text"
                        name="storeAddress"
                        value={formData.storeAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        توضیحات فروشگاه
                      </label>
                      <textarea
                        name="storeDescription"
                        value={formData.storeDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">لوگوی فروشگاه</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">لوگوی فروشگاه را اینجا بکشید یا کلیک کنید</p>
                    <p className="text-sm text-gray-500">PNG, JPG, SVG تا 2MB</p>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'payment' && (
              <form className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">تنظیمات درگاه پرداخت</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        درگاه پرداخت
                      </label>
                      <select
                        name="paymentGateway"
                        value={formData.paymentGateway}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="zarinpal">زرین‌پال</option>
                        <option value="mellat">بانک ملت</option>
                        <option value="saderat">بانک صادرات</option>
                        <option value="pasargad">بانک پاسارگاد</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شناسه مرچنت
                      </label>
                      <input
                        type="text"
                        name="merchantId"
                        value={formData.merchantId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="شناسه مرچنت درگاه پرداخت"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        کلید API
                      </label>
                      <input
                        type="password"
                        name="apiKey"
                        value={formData.apiKey}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="کلید API درگاه پرداخت"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL بازگشت
                      </label>
                      <input
                        type="url"
                        name="callbackUrl"
                        value={formData.callbackUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yoursite.com/callback"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'shipping' && (
              <form className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">روش‌های ارسال</h2>
                  <div className="space-y-4">
                    {formData.shippingMethods.map((method, index) => (
                      <div key={index} className="flex items-center space-x-4 space-x-reverse p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={method.name}
                            onChange={(e) => handleShippingMethodChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="w-32">
                          <input
                            type="text"
                            value={method.cost}
                            onChange={(e) => handleShippingMethodChange(index, 'cost', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="هزینه"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={method.active}
                            onChange={(e) => handleShippingMethodChange(index, 'active', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label className="mr-2 text-sm text-gray-700">فعال</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'email' && (
              <form className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">تنظیمات SMTP</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        هاست SMTP
                      </label>
                      <input
                        type="text"
                        name="smtpHost"
                        value={formData.smtpHost}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        پورت SMTP
                      </label>
                      <input
                        type="text"
                        name="smtpPort"
                        value={formData.smtpPort}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام کاربری
                      </label>
                      <input
                        type="text"
                        name="smtpUsername"
                        value={formData.smtpUsername}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رمز عبور
                      </label>
                      <input
                        type="password"
                        name="smtpPassword"
                        value={formData.smtpPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل فرستنده
                      </label>
                      <input
                        type="email"
                        name="fromEmail"
                        value={formData.fromEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام فرستنده
                      </label>
                      <input
                        type="text"
                        name="fromName"
                        value={formData.fromName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
