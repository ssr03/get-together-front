import React, { Component } from "react";
class ScheduleItem extends Component {
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onChange(name,value);
  };
  render() {
    const { id, day, start_time, end_time, onToggle } = this.props;
    return (
      <div className="form-inline row ml-2 mr-2">
        <div className="col-sm-2">{id === 0 ? "스터디 요일/시간" : ""}</div>
        <div className="col-sm-10 text-left">
          <select
            defaultValue={day}
            onChange={this.changeHandler}
            className="form-control col-sm-3"
            name="study_day"
            placeholder="스터디 요일"
          >
            <option value="월">월</option>
            <option value="화">화</option>
            <option value="수">수</option>
            <option value="목">목</option>
            <option value="금">금</option>
            <option value="토">토</option>
            <option value="일">일</option>
          </select>
          <input
            type="time"
            onChange={this.changeHandler}
            className="form-control col-sm-4"
            name="study_start_time"
            placeholder="시작시간"
            defaultValue={start_time}
          />
          <input
            type="time"
            onChange={this.changeHandler}
            className="form-control col-sm-4"
            name="study_end_time"
            placeholder="종료시간"
            defaultValue={end_time}
          />
          <a className="btn" onClick={onToggle}>
            <img src="/img/plus.png"></img>
          </a>
        </div>
      </div>
    );
  }
}

export default ScheduleItem;
