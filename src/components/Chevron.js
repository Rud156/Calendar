import React from "react";
import PropTypes from "prop-types";

const Chevron = ({ className, selectedCondition, handleClick }) => (
  <div
    className="calendar-icon cursor-pointer"
    onClick={() => {
      if (selectedCondition) handleClick();
    }}
  >
    <i
      className={className}
      style={{
        borderColor: selectedCondition ? "black" : "lightgrey"
      }}
    />
  </div>
);

Chevron.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCondition: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Chevron;
