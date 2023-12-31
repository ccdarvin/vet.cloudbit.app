
import { Segmented } from "antd";
import { SegmentedProps } from "antd/lib";
import { appointmentStatusOptions } from "../../constants";
import { useTranslate } from "@refinedev/core";
import BadgeField from "../fields/BadgeField";


export default function AppointmentStatusSegmented({
  value,
  onChange,
}: {
    value?: string;
    onChange?: SegmentedProps["onChange"];
}) {

  const translate = useTranslate();

  const getColor = (value: string) => {
    return appointmentStatusOptions.find((item) => item.value === value)?.color;
  }

  return (
    <Segmented
      value={value}
      onChange={onChange}
      options={appointmentStatusOptions.map((item) => ({
        value: item.value,
        label: <BadgeField value={translate(`appointments.enums.status.${item.value}`)} color={getColor(item.value)}/>,
      }) )}
    />
  );
}