import React, { Component } from "react";

import ScheduleItem from "./ScheduleItem";

class ScheduleItemList extends Component {
  render() {
    const { onToggle, onRemove, onChange } = this.props;
    const { schedules } = this.props;

    const scheduleList = schedules.map(
      ({ id, study_day, study_start_time, study_end_time }) => (
        <ScheduleItem
          id={id}
          day={study_day}
          start_time={study_start_time}
          end_time={study_end_time}
          onToggle={onToggle}
          onRemove={onRemove}
          onChange={onChange}
          key={id}
        />
      )
    );

    return <div>{scheduleList}</div>;
  }
}

export default ScheduleItemList;
