
import { Segmented } from "antd";
import { SegmentedProps } from "antd/lib";
import { appointmentStatusOptions } from "../../constants";
import AppointmentStatusField from "../fields/AppointmentStatusField";


export default function AppointmentStatusSegmented({
  value,
  onChange,
}: {
    value?: string;
    onChange?: SegmentedProps["onChange"];
}) {

  return (
    <Segmented
      value={value}
      onChange={onChange}
      options={appointmentStatusOptions.map((item) => ({
        value: item.value,
        label: <AppointmentStatusField value={item.value} />,
      }) )}
    />
  );
}