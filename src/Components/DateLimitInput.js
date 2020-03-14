import React, { Component } from "react";
import PropTypes from "prop-types";
import DatetimePicker from "react-datetimepicker-syaku";
import "../Styles/css/dateCss.css";
require("flatpickr/dist/themes/dark.css");

class DateLimitInput extends Component {
  constructor(props) {
    super(props);

    this.onDatetime = this.onDatetime.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.datetimeRef = undefined;
    this.state = {
      datetime: props.value,
      value: props.value,
      valueChange: false
    };
  }

  onDatetime(datetime, value) {
    this.setState({ datetime, value });
    this.props.setState(value);
  }

  onOpen() {
    this.datetimeRef.onOpen();
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      valueChange: true
    });
  }

  onChangeSuccess() {
    this.datetimeRef.setDatetime(this.state.value);
    this.setState({
      valueChange: false
    });
  }

  onClear() {
    this.datetimeRef.onClear();
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.onChangeSuccess();
    }
  }

  render() {
    console.log(this.props);
    return (
      <DatetimePicker
        ref={node => {
          this.datetimeRef = node;
        }}
        onChange={(datetime, value) => this.onDatetime(datetime, value)}
        defaultDate={this.state.datetime}
        type="datetime"
        minDate="today"
      >
        <div>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            onFocus={this.onOpen}
            placeholder={"마감 시간"}
            className="dateInput"
          />
        </div>
      </DatetimePicker>
    );
  }
}
DateLimitInput.propTypes = {
  setLimitState: PropTypes.func,
  value: PropTypes.object
};
export default DateLimitInput;
