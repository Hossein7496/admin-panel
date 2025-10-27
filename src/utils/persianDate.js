/**
 * فایل ابزارهای تاریخ شمسی - Persian Date Utilities
 * این فایل شامل توابع مختلف برای کار با تاریخ شمسی است
 * This file contains various functions for working with Persian dates
 */

// وارد کردن کتابخانه moment-jalaali - Import moment-jalaali library
import moment from 'moment-jalaali';

// تنظیم زبان فارسی برای moment - Set Persian language for moment
moment.loadPersian();

/**
 * تبدیل تاریخ میلادی به شمسی - Convert Gregorian date to Persian
 * @param {Date|string} date - تاریخ میلادی - Gregorian date
 * @param {string} format - فرمت خروجی - Output format
 * @returns {string} - تاریخ شمسی - Persian date
 */
export const toPersianDate = (date, format = 'jYYYY/jMM/jDD') => {
  if (!date) return '';
  return moment(date).format(format);
};

/**
 * تبدیل تاریخ شمسی به میلادی - Convert Persian date to Gregorian
 * @param {string} persianDate - تاریخ شمسی - Persian date
 * @returns {Date|null} - تاریخ میلادی - Gregorian date
 */
export const toGregorianDate = (persianDate) => {
  if (!persianDate) return null;
  return moment(persianDate, 'jYYYY/jMM/jDD').toDate();
};

/**
 * دریافت تاریخ امروز به صورت شمسی - Get today's date in Persian format
 * @param {string} format - فرمت خروجی - Output format
 * @returns {string} - تاریخ امروز شمسی - Today's Persian date
 */
export const getTodayPersian = (format = 'jYYYY/jMM/jDD') => {
  return moment().format(format);
};

/**
 * دریافت تاریخ امروز به صورت میلادی - Get today's date in Gregorian format
 * @returns {Date} - تاریخ امروز میلادی - Today's Gregorian date
 */
export const getTodayGregorian = () => {
  return new Date();
};

/**
 * فرمت کردن تاریخ شمسی با نام ماه - Format Persian date with month name
 * @param {Date|string} date - تاریخ - Date
 * @returns {string} - تاریخ فرمت شده - Formatted date
 */
export const formatPersianDateWithMonth = (date) => {
  if (!date) return '';
  return moment(date).format('jD jMMMM jYYYY');
};

/**
 * فرمت کردن تاریخ شمسی کوتاه - Format Persian date short
 * @param {Date|string} date - تاریخ - Date
 * @returns {string} - تاریخ کوتاه - Short date
 */
export const formatPersianDateShort = (date) => {
  if (!date) return '';
  return moment(date).format('jYYYY/jMM/jDD');
};

/**
 * فرمت کردن تاریخ شمسی با ساعت - Format Persian date with time
 * @param {Date|string} date - تاریخ - Date
 * @returns {string} - تاریخ با ساعت - Date with time
 */
export const formatPersianDateTime = (date) => {
  if (!date) return '';
  return moment(date).format('jYYYY/jMM/jDD HH:mm');
};

/**
 * محاسبه تفاوت تاریخ‌ها - Calculate date difference
 * @param {Date|string} startDate - تاریخ شروع - Start date
 * @param {Date|string} endDate - تاریخ پایان - End date
 * @returns {number} - تفاوت به روز - Difference in days
 */
export const getDateDifference = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, 'days');
};

/**
 * اضافه کردن روز به تاریخ شمسی - Add days to Persian date
 * @param {string} persianDate - تاریخ شمسی - Persian date
 * @param {number} days - تعداد روز - Number of days
 * @returns {string} - تاریخ جدید - New date
 */
export const addDaysToPersianDate = (persianDate, days) => {
  if (!persianDate) return '';
  return moment(persianDate, 'jYYYY/jMM/jDD').add(days, 'days').format('jYYYY/jMM/jDD');
};

/**
 * کم کردن روز از تاریخ شمسی - Subtract days from Persian date
 * @param {string} persianDate - تاریخ شمسی - Persian date
 * @param {number} days - تعداد روز - Number of days
 * @returns {string} - تاریخ جدید - New date
 */
export const subtractDaysFromPersianDate = (persianDate, days) => {
  if (!persianDate) return '';
  return moment(persianDate, 'jYYYY/jMM/jDD').subtract(days, 'days').format('jYYYY/jMM/jDD');
};

/**
 * اعتبارسنجی تاریخ شمسی - Validate Persian date
 * @param {string} persianDate - تاریخ شمسی - Persian date
 * @returns {boolean} - معتبر بودن تاریخ - Date validity
 */
export const isValidPersianDate = (persianDate) => {
  if (!persianDate) return false;
  return moment(persianDate, 'jYYYY/jMM/jDD', true).isValid();
};

/**
 * دریافت نام ماه شمسی - Get Persian month name
 * @param {number} monthNumber - شماره ماه - Month number
 * @returns {string} - نام ماه - Month name
 */
export const getPersianMonthName = (monthNumber) => {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
    'مرداد', 'شهریور', 'مهر', 'آبان',
    'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return months[monthNumber - 1] || '';
};

/**
 * دریافت نام روز هفته شمسی - Get Persian day name
 * @param {number} dayNumber - شماره روز - Day number
 * @returns {string} - نام روز - Day name
 */
export const getPersianDayName = (dayNumber) => {
  const days = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه',
    'چهارشنبه', 'پنج‌شنبه', 'جمعه'
  ];
  return days[dayNumber] || '';
};

/**
 * تولید آرایه ماه‌های شمسی - Generate Persian months array
 * @returns {Array} - آرایه ماه‌ها - Months array
 */
export const getPersianMonths = () => {
  return [
    { value: 1, label: 'فروردین' },
    { value: 2, label: 'اردیبهشت' },
    { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' },
    { value: 5, label: 'مرداد' },
    { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' },
    { value: 8, label: 'آبان' },
    { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' },
    { value: 11, label: 'بهمن' },
    { value: 12, label: 'اسفند' }
  ];
};

/**
 * تولید آرایه سال‌های شمسی - Generate Persian years array
 * از سال جاری تا 10 سال آینده - From current year to 10 years ahead
 * @returns {Array} - آرایه سال‌ها - Years array
 */
export const getPersianYears = () => {
  const currentYear = moment().jYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 10; i++) {
    years.push({ value: i, label: i.toString() });
  }
  return years;
};

/**
 * تولید آرایه روزهای ماه شمسی - Generate Persian days array
 * @param {number} year - سال - Year
 * @param {number} month - ماه - Month
 * @returns {Array} - آرایه روزها - Days array
 */
export const getPersianDays = (year, month) => {
  const daysInMonth = moment.jDaysInMonth(year, month);
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ value: i, label: i.toString() });
  }
  return days;
};
