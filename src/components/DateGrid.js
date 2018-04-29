// @ts-check

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { CSSTransition } from "react-transition-group";

const DateGrid = ({
  isActive,
  dateArray,
  isSameDate,
  handleDateClick,
  selectedDate
}) => (
  <CSSTransition
    in={isActive}
    timeout={{ enter: 300 }}
    classNames="date"
    unmountOnExit
    exit={false}
  >
    <div className="calendar-date-holder">
      <div>
        <div className="calendar-body-header display-flex">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(element => {
            return (
              <div className="calendar-body-header-col" key={element}>
                <div>{element}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {dateArray.map((element, index) => {
          return (
            <div key={`Key - ${index}`} className="calendar-row display-flex">
              {element.map((arrayDate, innerIndex) => {
                return (
                  <div
                    key={`Key - ${index} ${innerIndex}`}
                    className="calendar-col"
                    style={{ color: arrayDate.color }}
                  >
                    <div
                      className={`${
                        isSameDate(selectedDate, arrayDate.date)
                          ? "selected"
                          : ""
                      } cursor-pointer`}
                      onClick={() => {
                        handleDateClick(arrayDate.date);
                      }}
                    >
                      {arrayDate.date.date()}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  </CSSTransition>
);

DateGrid.propTypes = {
  isActive: PropTypes.bool.isRequired,
  dateArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        date: PropTypes.instanceOf(moment)
      })
    )
  ).isRequired,
  isSameDate: PropTypes.func.isRequired,
  handleDateClick: PropTypes.func,
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.any
  ])
};

DateGrid.defaultProps = {
  handleDateClick: () => {},
  selectedDate: null
};

export default DateGrid;
