import { SegmentedProps } from "antd/lib";
import { appointmentStatusOptions } from "../../constants";
import { useTranslate } from "@refinedev/core";
import { Select } from "antd";
import BadgeField from "../fields/BadgeField";

export default function AppointmentStatusSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange?: SegmentedProps["onChange"];
}) {
  const translate = useTranslate();

  const getColor = (value: string) => {
    return appointmentStatusOptions.find((item) => item.value === value)?.color;
  };

  return (
    <Select style={{ width: 200 }} value={value} onChange={onChange}>
      {appointmentStatusOptions.map((item) => (
        <Select.Option value={item.value} key={item.value}>
          <BadgeField
            value={translate(`appointments.enums.status.${item.value}`)}
            color={getColor(item.value)}
          />
        </Select.Option>
      ))}
    </Select>
  );
}
