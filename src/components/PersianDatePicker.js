/**
 * کامپوننت انتخابگر تاریخ شمسی - Persian Date Picker Component
 * این کامپوننت برای انتخاب تاریخ شمسی استفاده می‌شود
 * This component is used for selecting Persian dates
 */

'use client'; // استفاده از کامپوننت سمت کلاینت - Using client-side component

// وارد کردن React hooks - Import React hooks
import { useState } from 'react';

// وارد کردن آیکون‌های مورد نیاز - Import required icons
import { Calendar, ChevronDown } from 'lucide-react';

// وارد کردن توابع تاریخ شمسی - Import Persian date functions
import { 
  getPersianYears,      // دریافت سال‌های شمسی - Get Persian years
  getPersianMonths,    // دریافت ماه‌های شمسی - Get Persian months
  getPersianDays,      // دریافت روزهای شمسی - Get Persian days
  formatPersianDateShort, // فرمت تاریخ کوتاه - Short date format
  isValidPersianDate   // اعتبارسنجی تاریخ - Date validation
} from '@/utils/persianDate';

/**
 * کامپوننت انتخابگر تاریخ شمسی - Persian Date Picker Component
 * @param {Object} props - ویژگی‌های کامپوننت - Component props
 * @param {string} props.value - مقدار تاریخ انتخاب شده - Selected date value
 * @param {Function} props.onChange - تابع تغییر تاریخ - Date change function
 * @param {string} props.placeholder - متن راهنما - Placeholder text
 * @param {string} props.className - کلاس‌های CSS اضافی - Additional CSS classes
 * @param {boolean} props.disabled - غیرفعال بودن کامپوننت - Component disabled state
 * @returns {JSX.Element} - انتخابگر تاریخ - Date picker
 */
export default function PersianDatePicker({ 
  value, 
  onChange, 
  placeholder = "تاریخ را انتخاب کنید",
  className = "",
  disabled = false 
}) {
  // حالت باز/بسته بودن انتخابگر - Picker open/close state
  const [isOpen, setIsOpen] = useState(false);
  
  // حالت‌های انتخاب - Selection states
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // دریافت داده‌های مورد نیاز - Get required data
  const years = getPersianYears();
  const months = getPersianMonths();
  const days = selectedYear && selectedMonth ? getPersianDays(selectedYear, selectedMonth) : [];

  /**
   * تابع انتخاب تاریخ - Date selection function
   * @param {number} year - سال - Year
   * @param {number} month - ماه - Month
   * @param {number} day - روز - Day
   */
  const handleDateSelect = (year, month, day) => {
    const persianDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    onChange(persianDate);
    setIsOpen(false);
  };

  /**
   * تابع تغییر سال - Year change function
   * @param {number} year - سال انتخاب شده - Selected year
   */
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedDay(null);
  };

  /**
   * تابع تغییر ماه - Month change function
   * @param {number} month - ماه انتخاب شده - Selected month
   */
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectedDay(null);
  };

  /**
   * تابع تغییر روز - Day change function
   * @param {number} day - روز انتخاب شده - Selected day
   */
  const handleDayChange = (day) => {
    setSelectedDay(day);
    if (selectedYear && selectedMonth) {
      handleDateSelect(selectedYear, selectedMonth, day);
    }
  };

  /**
   * تابع فرمت نمایش مقدار - Display value formatting function
   * @returns {string} - مقدار فرمت شده - Formatted value
   */
  const formatDisplayValue = () => {
    if (!value) return placeholder;
    return formatPersianDateShort(value);
  };

  return (
    <div className={`relative ${className}`}>
      {/* دکمه انتخابگر تاریخ - Date picker button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          text-right flex items-center justify-between
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:border-gray-400'}
        `}
      >
        <span className={`${!value ? 'text-gray-500' : 'text-gray-900'}`}>
          {formatDisplayValue()}
        </span>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Calendar className="w-4 h-4 text-gray-400" />
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* پنل انتخاب تاریخ - Date selection panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* انتخاب سال - Year selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سال</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب سال</option>
                {years.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>

            {/* انتخاب ماه - Month selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ماه</label>
              <select
                value={selectedMonth || ''}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                disabled={!selectedYear}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">انتخاب ماه</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* انتخاب روز - Day selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">روز</label>
              <select
                value={selectedDay || ''}
                onChange={(e) => handleDayChange(parseInt(e.target.value))}
                disabled={!selectedMonth}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">انتخاب روز</option>
                {days.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* دکمه‌های عملیات - Action buttons */}
          <div className="flex justify-end space-x-2 space-x-reverse mt-4">
            {/* دکمه انصراف - Cancel button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              انصراف
            </button>
            {/* دکمه پاک کردن - Clear button */}
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              پاک کردن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
