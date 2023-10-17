"use client"
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Alert, Calendar } from "antd";

interface SelectableCalendarProps {
  value: dayjs.Dayjs;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const SelectableCalendar: React.FC<SelectableCalendarProps> = ({
  value,
  setValue,
}) => {
  // const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    // setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert message={`Your selected date: ${value?.format("YYYY-MM-DD, dddd")}`} />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </>
  );
};

export default SelectableCalendar;
