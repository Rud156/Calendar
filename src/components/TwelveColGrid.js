// @ts-check

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { CSSTransition } from "react-transition-group";

const TwelveColGrid = ({
  isActive,
  startDate,
  handleItemClick,
  bigArray,
  classConditionalFunction
}) => (
  <CSSTransition
    in={isActive}
    timeout={{ enter: 300 }}
    classNames="twelve"
    unmountOnExit
    exit={false}
  >
    <div className="calendar-twelve-holder">
      {bigArray.map((smallArray, index) => {
        return (
          <div key={`Key - ${index}`} className="calendar-twelve display-flex">
            {smallArray.map(element => {
              return (
                <div
                  key={element.item}
                  className="calendar-twelve-col"
                  style={{ color: element.color }}
                >
                  <div
                    className={`${
                      classConditionalFunction(element.item) ? "selected" : ""
                    } cursor-pointer`}
                    onClick={() => {
                      handleItemClick(element.item);
                    }}
                  >
                    {element.item}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </CSSTransition>
);

TwelveColGrid.propTypes = {
  isActive: PropTypes.bool.isRequired,
  startDate: PropTypes.instanceOf(moment).isRequired,
  handleItemClick: PropTypes.func.isRequired,
  bigArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        color: PropTypes.string
      })
    )
  ).isRequired,
  classConditionalFunction: PropTypes.func
};

TwelveColGrid.defaultProps = {
  classConditionalFunction: () => {}
};

export default TwelveColGrid;
