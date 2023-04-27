/* eslint-disable radix */
/* eslint-disable prefer-regex-literals */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */
import moment from 'moment';

const handleSnackBar = (action, text = '', _type = 'success') => ({
  isVisible: action !== 'hide',
  data: text,
  type: _type,
});

const hasNumericOrSpecialChar = (value) => {
  const hasNumericCase = (val) => new RegExp('(?=.*\\d)').test(val);
  const hasSpecialCase = (val) => new RegExp('(?=.*[-+_!@#$%^&*.,?])').test(val);
  return hasNumericCase(value) || hasSpecialCase(value);
};
// const calculateAge = (dob) => {
//   const birthDate = new Date(dob);
//   const difference = Date.now() - birthDate.getTime();
//   const age = new Date(difference);

//   return Math.abs(age.getUTCFullYear() - 1970);
// };

function calculateAge(dob) {
  const diff = Math.floor(Date.now() - dob.getTime());
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  // const months = Math.floor(days / 31);
  // const years = Math.floor(months / 12);
  const yr = parseInt(days / 365);
  return days % 365 && yr >= 4 ? yr + 1 : yr;
}

const removeSpecialChar = (string) => string && string?.length && string?.replace(/[^a-zA-Z ]/g, '');

const logDate = (inputDate) => {
  const dateFormat = 'MMM DD, YYYY hh:mm:ss A';
  const date = moment(new Date(inputDate)).format(dateFormat);
  return date;
};
const newDOB = (inputDate) => {
  const dateFormat = 'MMMM DD, YYYY';
  const date = moment(new Date(inputDate)).format(dateFormat);
  return date;
};

const formatDate = (inputDate, format) => {
  const dateFormat = format;
  const date = moment(new Date(inputDate)).format(dateFormat);
  return date;
};

const getFormattedDate = (inputDate, format) => {
  if (inputDate === '' || !inputDate) {
    return '';
  }
  const date = new Date(inputDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (hh < 10) {
    hh = `0${hh}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (ss < 10) {
    ss = `0${ss}`;
  }

  return format === 'MMDDYYYY' ? `${month}.${dt}.${year} ${hh}.${mm}.${ss}` : `${dt}.${month}.${year} ${hh}.${mm}.${ss}`;
};
const getNewFormattedDate = (inputDate) => {
  if (inputDate === '' || !inputDate) {
    return '';
  }
  const date = new Date(inputDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${month}.${dt}.${year}`;
};
const getTimeFromUnixFormat = (inputTime) => {
  const fommatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(inputTime);

  return fommatted;
};
const getNewTimeFromUnixFormat = (inputTime) => {
  const fommatted = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(inputTime);

  return fommatted;
};
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
const avoidNegativeValue = (value) => (value <= 0 ? '0.00' : value);
const checkDateValid = (inputDate) => {
  const year = new Date(inputDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const dateFormat = 'DD-MM-YYYY';
  const toDateFormat = moment(new Date(inputDate)).format(dateFormat);
  const isValid = moment(toDateFormat, dateFormat, true).isValid();
  return isValid && year >= 1900 && year <= currentYear;
};

const getMaskedEmail = (email) => {
  if (!email) return;
  const output = email?.replace(/(..)(.{1,3})(?=.*@)/g, (_, a, b) => a + '*'.repeat(b.length));
  return output;
};

const getDistanceBetweenTwoPoint = (p1, p2) => {
  const rad = (x) => (x * Math.PI) / 180;

  if (!p1 || !p2 || !p1.lat || !p1.lng || !p2.lat || !p2.lng) return 0;

  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(rad(p1?.lat)) * Math.cos(rad(p2?.lat))
    * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};
const calculateTotalFee = (studentData) => {
  let totalAmo = 0;
  studentData?.forEach((lineItem) => {
    totalAmo += Number(lineItem?.enrollmentCourse?.feeStructure?.total);
  });

  return totalAmo?.toFixed(2);
};
const calculateTotalPayment = (studentData, contributionAmount) => {
  let totalAmo = 0;
  studentData?.forEach((lineItem) => {
    totalAmo += Number(lineItem?.enrollmentCourse?.feeStructure?.total);
  });

  const res = totalAmo
    + Number(
      contributionAmount < 0
        ? 0
        : contributionAmount,
    );
  return res?.toFixed(2);
};

const getWeekNumOfMonthOfDate = (d) => {
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const month = d.toLocaleString('default', { month: 'long' });
  const week = Math.ceil((d.getDate() + (firstDay - 1)) / 7);
  return { month, week };
};
export {
  getWeekNumOfMonthOfDate,
  handleSnackBar,
  getFormattedDate,
  getNewFormattedDate,
  calculateAge,
  removeSpecialChar,
  getTimeFromUnixFormat,
  getNewTimeFromUnixFormat,
  containsSpecialChars,
  avoidNegativeValue,
  checkDateValid,
  hasNumericOrSpecialChar,
  getMaskedEmail,
  logDate,
  formatDate,
  newDOB,
  getDistanceBetweenTwoPoint,
  calculateTotalFee,
  calculateTotalPayment,
};
