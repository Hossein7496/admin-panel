/**
 * صفحه مدیریت نظرات و نقدها - Reviews Management Page
 * این صفحه برای مدیریت نظرات و نقدهای مشتریان استفاده می‌شود
 * This page is used for managing customer reviews and ratings
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت‌های مورد نیاز - Import required components
import Layout from '@/components/Layout/Layout';
import { Search, Filter, Eye, Check, X, MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';

// داده‌های نمونه نظرات - Sample reviews data
const reviews = [
  {
    id: 1,
    product: 'آیفون 15 پرو مکس',
    customer: 'احمد محمدی',
    email: 'ahmad@example.com',
    rating: 5,
    comment: 'محصول فوق‌العاده‌ای بود. کیفیت عالی و عملکرد بی‌نظیر. حتماً توصیه می‌کنم.',
    date: '1403/01/15',
    status: 'تایید شده',
    helpful: 12
  },
  {
    id: 2,
    product: 'مک‌بوک پرو 16 اینچ',
    customer: 'فاطمه احمدی',
    email: 'fateme@example.com',
    rating: 4,
    comment: 'لپ‌تاپ خوبی است اما قیمت کمی بالا است. کیفیت ساخت عالی است.',
    date: '1403/01/14',
    status: 'در انتظار تایید',
    helpful: 8
  },
  {
    id: 3,
    product: 'سامسونگ گلکسی S24',
    customer: 'علی رضایی',
    email: 'ali@example.com',
    rating: 3,
    comment: 'موبایل خوبی است اما باتری زود تمام می‌شود. دوربین کیفیت خوبی دارد.',
    date: '1403/01/13',
    status: 'تایید شده',
    helpful: 5
  },
  {
    id: 4,
    product: 'ایپد پرو 12.9 اینچ',
    customer: 'مریم حسینی',
    email: 'maryam@example.com',
    rating: 5,
    comment: 'تبلت عالی برای کارهای گرافیکی. صفحه نمایش فوق‌العاده است.',
    date: '1403/01/12',
    status: 'رد شده',
    helpful: 15
  },
  {
    id: 5,
    product: 'ایرپادز پرو',
    customer: 'حسن کریمی',
    email: 'hasan@example.com',
    rating: 4,
    comment: 'کیفیت صدا عالی است. طراحی زیبا و راحت است.',
    date: '1403/01/11',
    status: 'در انتظار تایید',
    helpful: 7
  }
];

/**
 * تابع دریافت رنگ وضعیت نظر - Get review status color function
 * @param {string} status - وضعیت نظر - Review status
 * @returns {string} - کلاس‌های CSS برای رنگ - CSS classes for color
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'تایید شده': // Approved
      return 'bg-green-100 text-green-800';
    case 'در انتظار تایید': // Pending approval
      return 'bg-yellow-100 text-yellow-800';
    case 'رد شده': // Rejected
      return 'bg-red-100 text-red-800';
    default: // Default
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * تابع تولید ستاره‌های امتیاز - Generate rating stars function
 * @param {number} rating - امتیاز - Rating
 * @returns {JSX.Element[]} - آرایه ستاره‌ها - Stars array
 */
const getRatingStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
      }`}
    />
  ));
};

/**
 * کامپوننت مدیریت نظرات - Reviews Management Component
 * @returns {JSX.Element} - صفحه مدیریت نظرات - Reviews management page
 */
export default function Reviews() {
  // حالت‌های کامپوننت - Component states
  const [searchTerm, setSearchTerm] = useState(''); // عبارت جستجو - Search term
  const [statusFilter, setStatusFilter] = useState(''); // فیلتر وضعیت - Status filter
  const [ratingFilter, setRatingFilter] = useState(''); // فیلتر امتیاز - Rating filter

  // فیلتر کردن نظرات - Filter reviews
  const filteredReviews = reviews.filter(review => {
    // تطبیق با عبارت جستجو - Match with search term
    const matchesSearch = 
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    // تطبیق با فیلتر وضعیت - Match with status filter
    const matchesStatus = statusFilter === '' || review.status === statusFilter;
    // تطبیق با فیلتر امتیاز - Match with rating filter
    const matchesRating = ratingFilter === '' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  /**
   * تابع تایید نظر - Approve review function
   * @param {number} reviewId - شناسه نظر - Review ID
   */
  const handleApprove = (reviewId) => {
    console.log('Approve review:', reviewId);
  };

  /**
   * تابع رد نظر - Reject review function
   * @param {number} reviewId - شناسه نظر - Review ID
   */
  const handleReject = (reviewId) => {
    console.log('Reject review:', reviewId);
  };

  /**
   * تابع پاسخ به نظر - Reply to review function
   * @param {number} reviewId - شناسه نظر - Review ID
   */
  const handleReply = (reviewId) => {
    console.log('Reply to review:', reviewId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت نظرات و نقدها</h1>
        </div>

        {/* فیلترها و جستجو */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در نظرات..."
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
              <option value="تایید شده">تایید شده</option>
              <option value="در انتظار تایید">در انتظار تایید</option>
              <option value="رد شده">رد شده</option>
            </select>
            
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه امتیازات</option>
              <option value="5">5 ستاره</option>
              <option value="4">4 ستاره</option>
              <option value="3">3 ستاره</option>
              <option value="2">2 ستاره</option>
              <option value="1">1 ستاره</option>
            </select>
            
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </button>
          </div>
        </div>

        {/* جدول نظرات */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    محصول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مشتری
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    امتیاز
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نظر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ
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
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{review.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{review.customer}</div>
                      <div className="text-sm text-gray-500">{review.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRatingStars(review.rating)}
                        <span className="text-sm text-gray-600 mr-2">({review.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {review.comment.length > 100 
                          ? `${review.comment.substring(0, 100)}...` 
                          : review.comment
                        }
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {review.helpful} نفر مفید دانستند
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{review.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="text-green-600 hover:text-green-900"
                          title="تایید"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(review.id)}
                          className="text-red-600 hover:text-red-900"
                          title="رد"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReply(review.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="پاسخ"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900" title="مشاهده">
                          <Eye className="w-4 h-4" />
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
              نمایش 1 تا {filteredReviews.length} از {reviews.length} نظر
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
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">کل نظرات</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">تایید شده</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'تایید شده').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">در انتظار</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'در انتظار تایید').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">رد شده</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'رد شده').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
