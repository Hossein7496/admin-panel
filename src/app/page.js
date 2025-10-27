/**
 * صفحه داشبورد اصلی - Main Dashboard Page
 * این صفحه شامل آمار کلی، نمودارها و اطلاعات مهم سیستم است
 * This page contains overall statistics, charts and important system information
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن کامپوننت لایه اصلی - Import main layout component
import Layout from '@/components/Layout/Layout';

// وارد کردن آیکون‌های مورد نیاز - Import required icons
import { 
  ShoppingCart,   // آیکون سبد خرید - Shopping cart icon
  DollarSign,     // آیکون دلار - Dollar sign icon
  Users,          // آیکون کاربران - Users icon
  Package,        // آیکون بسته - Package icon
  TrendingUp,     // آیکون روند صعودی - Trending up icon
  TrendingDown    // آیکون روند نزولی - Trending down icon
} from 'lucide-react';

// وارد کردن کامپوننت‌های نمودار - Import chart components
import { 
  LineChart,        // نمودار خطی - Line chart
  Line,             // خط نمودار - Chart line
  XAxis,            // محور X - X axis
  YAxis,            // محور Y - Y axis
  CartesianGrid,    // شبکه مختصات - Cartesian grid
  Tooltip,          // راهنمای نمودار - Chart tooltip
  ResponsiveContainer, // کانتینر واکنش‌گرا - Responsive container
  PieChart,         // نمودار دایره‌ای - Pie chart
  Pie,              // بخش دایره - Pie slice
  Cell,             // سلول نمودار - Chart cell
  BarChart,         // نمودار میله‌ای - Bar chart
  Bar,              // میله نمودار - Chart bar
  Legend            // راهنمای نمودار - Chart legend
} from 'recharts';

// وارد کردن توابع تاریخ شمسی - Import Persian date functions
import { getTodayPersian, formatPersianDateWithMonth } from '@/utils/persianDate';

// داده‌های نمونه برای نمودار فروش ماهانه - Sample data for monthly sales chart
const salesData = [
  { name: 'فروردین', sales: 4000 }, // فروش فروردین - Farvardin sales
  { name: 'اردیبهشت', sales: 3000 }, // فروش اردیبهشت - Ordibehesht sales
  { name: 'خرداد', sales: 2000 },    // فروش خرداد - Khordad sales
  { name: 'تیر', sales: 2780 },      // فروش تیر - Tir sales
  { name: 'مرداد', sales: 1890 },    // فروش مرداد - Mordad sales
  { name: 'شهریور', sales: 2390 },   // فروش شهریور - Shahrivar sales
];

// داده‌های نمونه برای نمودار دایره‌ای دسته‌بندی - Sample data for category pie chart
const categoryData = [
  { name: 'موبایل', value: 35, color: '#0088FE' },        // موبایل - Mobile
  { name: 'لپ‌تاپ', value: 25, color: '#00C49F' },          // لپ‌تاپ - Laptop
  { name: 'لوازم جانبی', value: 20, color: '#FFBB28' },    // لوازم جانبی - Accessories
  { name: 'تبلت', value: 15, color: '#FF8042' },          // تبلت - Tablet
  { name: 'سایر', value: 5, color: '#8884D8' },            // سایر - Others
];

// داده‌های نمونه برای نمودار محصولات پرفروش - Sample data for top products chart
const topProductsData = [
  { name: 'آیفون 15', sales: 120 },      // آیفون 15 - iPhone 15
  { name: 'مک‌بوک پرو', sales: 98 },    // مک‌بوک پرو - MacBook Pro
  { name: 'سامسونگ S24', sales: 85 },   // سامسونگ S24 - Samsung S24
  { name: 'ایپد پرو', sales: 72 },      // ایپد پرو - iPad Pro
  { name: 'ایرپادز', sales: 65 },       // ایرپادز - AirPods
];

// داده‌های نمونه برای آخرین سفارشات - Sample data for recent orders
const recentOrders = [
  { id: '#12345', customer: 'احمد محمدی', amount: '2,500,000', status: 'در حال پردازش', date: getTodayPersian() },
  { id: '#12346', customer: 'فاطمه احمدی', amount: '1,800,000', status: 'ارسال شده', date: getTodayPersian() },
  { id: '#12347', customer: 'علی رضایی', amount: '3,200,000', status: 'تحویل شده', date: getTodayPersian() },
  { id: '#12348', customer: 'مریم حسینی', amount: '950,000', status: 'در انتظار پرداخت', date: getTodayPersian() },
  { id: '#12349', customer: 'حسن کریمی', amount: '4,100,000', status: 'در حال پردازش', date: getTodayPersian() },
];

// داده‌های نمونه برای آخرین نظرات - Sample data for recent reviews
const recentReviews = [
  { product: 'آیفون 15', customer: 'احمد محمدی', rating: 5, comment: 'عالی بود!', date: getTodayPersian() },
  { product: 'مک‌بوک پرو', customer: 'فاطمه احمدی', rating: 4, comment: 'خیلی خوب', date: getTodayPersian() },
  { product: 'سامسونگ S24', customer: 'علی رضایی', rating: 5, comment: 'بسیار راضی', date: getTodayPersian() },
];

// داده‌های نمونه برای محصولات رو به اتمام - Sample data for low stock products
const lowStockProducts = [
  { name: 'آیفون 15', stock: 2 },      // آیفون 15 - iPhone 15
  { name: 'مک‌بوک پرو', stock: 1 },   // مک‌بوک پرو - MacBook Pro
  { name: 'ایپد پرو', stock: 3 },      // ایپد پرو - iPad Pro
];

/**
 * کامپوننت کارت آمار - Statistics Card Component
 * این کامپوننت برای نمایش آمار مختلف در داشبورد استفاده می‌شود
 * This component is used to display various statistics in the dashboard
 * 
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {string} props.title - عنوان کارت - Card title
 * @param {string} props.value - مقدار آمار - Statistics value
 * @param {string} props.change - درصد تغییر - Change percentage
 * @param {React.Component} props.icon - آیکون کارت - Card icon
 * @param {string} props.trend - روند تغییر (up/down) - Change trend (up/down)
 * @returns {JSX.Element} - کارت آمار - Statistics card
 */
function StatCard({ title, value, change, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          {/* عنوان کارت - Card title */}
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {/* مقدار اصلی - Main value */}
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {/* نمایش روند تغییر - Display change trend */}
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
            )}
            <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          </div>
        </div>
        {/* آیکون کارت - Card icon */}
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}

/**
 * کامپوننت اصلی داشبورد - Main Dashboard Component
 * این کامپوننت صفحه اصلی داشبورد را نمایش می‌دهد
 * This component displays the main dashboard page
 * 
 * @returns {JSX.Element} - صفحه داشبورد - Dashboard page
 */
export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* بخش کارت‌های آمار - Statistics Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* کارت سفارشات امروز - Today's Orders Card */}
          <StatCard
            title="سفارشات امروز"        // Today's Orders
            value="24"
            change="+12%"
            icon={ShoppingCart}
            trend="up"
          />
          {/* کارت فروش امروز - Today's Sales Card */}
          <StatCard
            title="فروش امروز"          // Today's Sales
            value="12,500,000"
            change="+8%"
            icon={DollarSign}
            trend="up"
          />
          {/* کارت کاربران جدید - New Users Card */}
          <StatCard
            title="کاربران جدید"        // New Users
            value="156"
            change="+23%"
            icon={Users}
            trend="up"
          />
          {/* کارت محصولات موجود - Available Products Card */}
          <StatCard
            title="محصولات موجود"      // Available Products
            value="1,234"
            change="-2%"
            icon={Package}
            trend="down"
          />
        </div>

        {/* بخش نمودارها - Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* نمودار خطی فروش ماهانه - Monthly Sales Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">روند فروش ماهانه</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />  {/* شبکه مختصات - Coordinate grid */}
                <XAxis dataKey="name" />                  {/* محور X - X axis */}
                <YAxis />                                 {/* محور Y - Y axis */}
                <Tooltip />                               {/* راهنمای نمودار - Chart tooltip */}
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* نمودار دایره‌ای دسته‌بندی محصولات - Product Category Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">توزیع دسته‌بندی محصولات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"                    // مرکز افقی - Horizontal center
                  cy="50%"                    // مرکز عمودی - Vertical center
                  labelLine={false}           // بدون خط برچسب - No label line
                  label={false}               // بدون برچسب - No label
                  outerRadius={80}            // شعاع خارجی - Outer radius
                  fill="#8884d8"             // رنگ پیش‌فرض - Default color
                  dataKey="value"             // کلید داده - Data key
                >
                  {/* رنگ‌بندی بخش‌های نمودار - Chart sections coloring */}
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {/* راهنمای نمودار - Chart tooltip */}
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelFormatter={(label) => `${label}`}
                />
                {/* راهنمای نمودار - Chart legend */}
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="rect"
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, marginRight: '8px' }}>
                      {value} ({entry.payload.value}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* نمودار میله‌ای محصولات پرفروش - Top Products Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">محصولات پرفروش</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />  {/* شبکه مختصات - Coordinate grid */}
              <XAxis dataKey="name" />                  {/* محور X - X axis */}
              <YAxis />                                 {/* محور Y - Y axis */}
              <Tooltip />                               {/* راهنمای نمودار - Chart tooltip */}
              <Bar dataKey="sales" fill="#3B82F6" />   {/* میله‌های نمودار - Chart bars */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* بخش لیست‌های سریع - Quick Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* لیست آخرین سفارشات - Recent Orders List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">آخرین سفارشات</h3>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    {/* شماره سفارش - Order ID */}
                    <p className="font-medium text-gray-900">{order.id}</p>
                    {/* نام مشتری - Customer name */}
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    {/* تاریخ سفارش - Order date */}
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-left">
                    {/* مبلغ سفارش - Order amount */}
                    <p className="font-medium text-gray-900">{order.amount} تومان</p>
                    {/* وضعیت سفارش - Order status */}
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* لیست آخرین نظرات - Recent Reviews List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">آخرین نظرات</h3>
            <div className="space-y-3">
              {recentReviews.map((review, index) => (
                <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    {/* نام محصول - Product name */}
                    <p className="font-medium text-gray-900">{review.product}</p>
                    {/* نمایش ستاره‌های امتیاز - Display rating stars */}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* نام مشتری - Customer name */}
                  <p className="text-sm text-gray-600">{review.customer}</p>
                  {/* متن نظر - Review comment */}
                  <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                  {/* تاریخ نظر - Review date */}
                  <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* لیست محصولات رو به اتمام - Low Stock Products List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">محصولات رو به اتمام</h3>
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  {/* نام محصول - Product name */}
                  <p className="font-medium text-gray-900">{product.name}</p>
                  {/* نمایش موجودی با رنگ‌بندی - Display stock with color coding */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock <= 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.stock} عدد
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}