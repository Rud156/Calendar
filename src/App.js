// @ts-check

import React, { Component } from "react";
import moment from "moment";

import CalendarComponent from "./components/CalendarComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment("20-05-2018", "DD-MM-YYYY"),
      minDate: moment("15-04-2018", "DD-MM-YYYY"),
      maxDate: moment("27-07-2018", "DD-MM-YYYY")
    };
  }

  handleDateSelect = date => {
    this.setState({ selectedDate: moment(date) });
  };

  render() {
    const { selectedDate, minDate, maxDate } = this.state;

    return (
      <CalendarComponent
        handleDateClick={this.handleDateSelect}
        selectedDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }
}

export default App;
