// @ts-check

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import TwelveColGrid from "./TwelveColGrid";
import DateGrid from "./DateGrid";
import Chevron from "./Chevron";

import "./calendar.css";
import {
  getCalendarArray,
  isSameDate,
  SELECTED_TYPE,
  getYearArray,
  getMonthArray,
  isMonthBefore,
  isMonthAfter
} from "../utils/calendar";

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);

    const startDate = moment().startOf("month");

    this.state = {
      startDate,
      dateArray: [],
      yearArray: [],
      selectedType: SELECTED_TYPE.DATE,
      monthsArray: []
    };
  }

  componentWillMount() {
    const { minDate, maxDate } = this.props;
    const { startDate } = this.state;
    const endDate = startDate.clone().endOf("month");
    const dateArray = getCalendarArray(startDate, endDate, minDate, maxDate);
    const monthsArray = getMonthArray(minDate, maxDate);
    this.setState({ dateArray, monthsArray });
  }

  componentWillReceiveProps(nextProps) {
    const monthsArray = getMonthArray(nextProps.minDate, nextProps.maxDate);
    this.setState({ monthsArray });
  }

  handleNextMonthClick = () => {
    const { minDate, maxDate } = this.props;
    const { startDate } = this.state;

    const nextMonthStart = startDate
      .clone()
      .add(1, "month")
      .startOf("month");

    if (!isMonthAfter(nextMonthStart, maxDate)) {
      return;
    }

    const nextMonthEnd = nextMonthStart.clone().endOf("month");
    const dateArray = getCalendarArray(
      nextMonthStart,
      nextMonthEnd,
      minDate,
      maxDate
    );
    this.setState({
      dateArray,
      startDate: nextMonthStart,
      selectedType: SELECTED_TYPE.DATE
    });
  };

  handlePrevMonthClick = () => {
    const { minDate, maxDate } = this.props;
    const { startDate } = this.state;

    const prevMonthStart = startDate
      .clone()
      .subtract(1, "month")
      .startOf("month");

    if (!isMonthBefore(prevMonthStart, minDate)) {
      return;
    }

    const nextMonthEnd = prevMonthStart.clone().endOf("month");
    const dateArray = getCalendarArray(
      prevMonthStart,
      nextMonthEnd,
      minDate,
      maxDate
    );
    this.setState({
      dateArray,
      startDate: prevMonthStart,
      selectedType: SELECTED_TYPE.DATE
    });
  };

  handleNextYearClick = () => {
    const { minDate, maxDate } = this.props;
    const { yearArray, startDate } = this.state;

    if (maxDate && maxDate.year() <= startDate.year()) {
      return;
    }

    const lastRow = yearArray[yearArray.length - 1];
    const firstYear = lastRow[lastRow.length - 1] + 1;

    const currentYearArray = getYearArray(firstYear, minDate, maxDate);

    this.setState({
      yearArray: currentYearArray,
      selectedType: SELECTED_TYPE.YEAR
    });
  };

  handlePrevYearClick = () => {
    const { minDate, maxDate } = this.props;
    const { yearArray, startDate } = this.state;

    if (minDate && minDate.year() >= startDate.year()) {
      return;
    }

    const firstYear = yearArray[0][0] - 12;
    const currentYearArray = getYearArray(firstYear, minDate, maxDate);

    this.setState({
      yearArray: currentYearArray,
      selectedType: SELECTED_TYPE.YEAR
    });
  };

  handleNextClick = () => {
    const { selectedType } = this.state;

    if (selectedType === SELECTED_TYPE.DATE) {
      this.handleNextMonthClick();
    } else {
      this.handleNextYearClick();
    }
  };

  handlePrevClick = () => {
    const { selectedType } = this.state;

    if (selectedType === SELECTED_TYPE.DATE) {
      this.handlePrevMonthClick();
    } else {
      this.handlePrevYearClick();
    }
  };

  handleDateClick = date => {
    this.setState({
      selectedType: SELECTED_TYPE.DATE
    });

    const { minDate, maxDate } = this.props;
    if (minDate && moment(date).isBefore(minDate)) return;
    else if (maxDate && moment(date).isAfter(maxDate)) return;

    this.props.handleDateClick(date);
  };

  handleMonthHeaderClick = month => {
    this.setState({ selectedType: SELECTED_TYPE.MONTH });
  };

  handleYearHeaderClick = year => {
    const { minDate, maxDate } = this.props;
    const firstYear = year - 5;
    const yearArray = getYearArray(firstYear, minDate, maxDate);

    this.setState({ yearArray, selectedType: SELECTED_TYPE.YEAR });
  };

  handleMonthClick = month => {
    const { minDate, maxDate } = this.props;
    const { startDate } = this.state;

    const currentStartDate = moment(month, "MMM");
    if (minDate && minDate.month() > currentStartDate.month()) return;
    else if (maxDate && maxDate.month() < currentStartDate.month()) return;

    currentStartDate.set("year", startDate.year());
    const endDate = currentStartDate.clone().endOf("month");
    const dateArray = getCalendarArray(
      currentStartDate,
      endDate,
      minDate,
      maxDate
    );

    this.setState({
      startDate: currentStartDate,
      dateArray,
      selectedType: SELECTED_TYPE.DATE
    });
  };

  handleYearClick = year => {
    const { minDate, maxDate } = this.props;
    const minYear = minDate ? minDate.year() : 0;
    const maxYear = maxDate ? maxDate.year() : 99999;

    if (minYear > year || maxYear < year) {
      return;
    }

    const { startDate } = this.state;
    startDate.set("year", year);
    this.setState({ startDate, selectedType: SELECTED_TYPE.MONTH });
  };

  classConditionalFunction = item => {
    const { selectedType, startDate } = this.state;
    const { selectedDate } = this.props;

    if (!selectedDate) return false;

    if (selectedType === SELECTED_TYPE.MONTH) {
      return (
        selectedDate.format("MMM") === item &&
        selectedDate.year() === startDate.year()
      );
    } else {
      return selectedDate.year() === item;
    }
  };

  render() {
    const {
      dateArray,
      yearArray,
      startDate,
      selectedType,
      monthsArray
    } = this.state;
    const { selectedDate } = this.props;

    return (
      <div className="calendar">
        <div className="calendar-header display-flex">
          <Chevron
            className="left"
            selectedCondition={selectedType !== SELECTED_TYPE.MONTH}
            handleClick={this.handlePrevClick}
          />
          <div
            className="calendar-header-month cursor-pointer"
            onClick={() => {
              this.handleMonthHeaderClick(startDate.month());
            }}
          >
            {startDate.format("MMMM")}
          </div>
          <div
            className="calendar-header-year cursor-pointer"
            onClick={() => {
              this.handleYearHeaderClick(startDate.year());
            }}
          >
            {startDate.format("YYYY")}
          </div>
          <Chevron
            className="right"
            selectedCondition={selectedType !== SELECTED_TYPE.MONTH}
            handleClick={this.handleNextClick}
          />
        </div>
        <div className="calendar-body">
          <DateGrid
            isActive={selectedType === SELECTED_TYPE.DATE}
            dateArray={dateArray}
            isSameDate={isSameDate}
            handleDateClick={this.handleDateClick}
            selectedDate={selectedDate}
          />
          <TwelveColGrid
            isActive={selectedType === SELECTED_TYPE.MONTH}
            startDate={startDate}
            handleItemClick={this.handleMonthClick}
            bigArray={monthsArray}
            classConditionalFunction={this.classConditionalFunction}
          />
          <TwelveColGrid
            isActive={selectedType === SELECTED_TYPE.YEAR}
            startDate={startDate}
            handleItemClick={this.handleYearClick}
            bigArray={yearArray}
            classConditionalFunction={this.classConditionalFunction}
          />
        </div>
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.any
  ]),
  eventsArray: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(moment)
    })
  ),
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(moment), PropTypes.any]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(moment), PropTypes.any]),
  handleDateClick: PropTypes.func
};

CalendarComponent.defaultProps = {
  selectedDate: null,
  eventsArray: [],
  minDate: null,
  maxDate: null,
  handleDateClick: () => {}
};

export default CalendarComponent;
