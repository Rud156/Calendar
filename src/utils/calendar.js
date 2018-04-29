// @ts-check

import moment from "moment";

export const getCalendarArray = (startDate, endDate, minDate, maxDate) => {
  const startDateCount = moment(startDate).dayOfYear();
  const endDateCount = moment(endDate).dayOfYear();
  const minDateCount = minDate ? minDate.dayOfYear() : 0;
  const maxDateCount = maxDate ? maxDate.dayOfYear() : 99999;

  const currentDayOfWeek = moment(startDate).startOf("week");
  const dateArray = [];

  for (let i = 0; i < 6; i++) {
    const tempArray = [];

    for (let j = 0; j < 7; j++) {
      const currentDate = currentDayOfWeek.dayOfYear();
      const dataObject = {
        date: currentDayOfWeek.clone()
      };

      if (
        currentDate < startDateCount ||
        currentDate > endDateCount ||
        currentDate < minDateCount ||
        currentDate > maxDateCount
      ) {
        dataObject["color"] = "lightgrey";
      } else {
        dataObject["color"] = "black";
      }

      tempArray.push(dataObject);
      currentDayOfWeek.add(1, "day");
    }

    dateArray.push(tempArray);
  }

  return dateArray;
};

export const getYearArray = (firstYear, minDate, maxDate) => {
  let currentCount = 0;
  const currentYearArray = [];

  const minYear = minDate ? minDate.year() : 0;
  const maxYear = maxDate ? maxDate.year() : 99999;

  for (let i = 0; i < 4; i++) {
    const tempArray = [];
    for (let j = 0; j < 3; j++) {
      const year = firstYear + currentCount;
      const dataObject = {
        item: year,
        color: year >= minYear && year <= maxYear ? "black" : "lightgrey"
      };
      tempArray.push(dataObject);
      currentCount += 1;
    }
    currentYearArray.push(tempArray);
  }

  return currentYearArray;
};

export const getMonthArray = (minDate, maxDate) => {
  let startMonth = 1;
  const currentMonthArray = [];
  const minMonth = minDate ? minDate.month() + 1 : -1;
  const maxMonth = maxDate ? maxDate.month() + 1 : 13;

  for (let i = 0; i < 4; i++) {
    const tempArray = [];
    for (let j = 0; j < 3; j++) {
      const month = moment(startMonth, "MM").format("MMM");
      const dataObject = {
        item: month,
        color:
          startMonth >= minMonth && startMonth <= maxMonth
            ? "black"
            : "lightgrey"
      };

      tempArray.push(dataObject);
      startMonth += 1;
    }
    currentMonthArray.push(tempArray);
  }

  return currentMonthArray;
};

export const isSameDate = (firstDate, secondDate) => {
  if (!firstDate || !secondDate) return false;

  const momentFirstDate = moment(firstDate);
  const momentSecondDate = moment(secondDate);

  return (
    momentFirstDate.dayOfYear() === momentSecondDate.dayOfYear() &&
    momentFirstDate.year() === momentSecondDate.year()
  );
};

export const isMonthBefore = (prevMonthStart, minDate) => {
  if (!minDate) return false;
  const prevMonthStartMonth = prevMonthStart.month();
  const prevMonthStartYear = prevMonthStart.year();
  const minDateMonth = minDate.month();
  const minDateYear = minDate.year();

  if (prevMonthStartYear === minDateYear) {
    if (minDateMonth > prevMonthStartMonth) return false;
  } else if (prevMonthStartMonth === minDateMonth) {
    if (minDateYear > prevMonthStartYear) return false;
  } else if (minDateYear > prevMonthStartYear) return false;

  return true;
};

export const isMonthAfter = (nextMonthStart, maxDate) => {
  if (!maxDate) return false;
  const nextMonthStartMonth = nextMonthStart.month();
  const nextMonthStartYear = nextMonthStart.year();
  const maxDateMonth = maxDate.month();
  const maxDateYear = maxDate.year();

  if (nextMonthStartYear === maxDateYear) {
    if (maxDateMonth < nextMonthStartMonth) return false;
  } else if (nextMonthStartMonth === maxDateMonth) {
    if (maxDateYear < nextMonthStartYear) return false;
  } else if (maxDateYear < nextMonthStartYear) return false;

  return true;
};

export const SELECTED_TYPE = {
  DATE: "DATE",
  MONTH: "MONTH",
  YEAR: "YEAR"
};
