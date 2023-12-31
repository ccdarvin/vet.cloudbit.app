
import { Segmented } from "antd";
import { SegmentedProps } from "antd/lib";
import { appointmentStatusOptions, paymentMethodOptions } from "../../constants";
import BadgeField from "../fields/BadgeField";
import { useTranslate } from "@refinedev/core";


export default function PaymentMethodSegmented({
  value,
  onChange,
}: {
    value?: string;
    onChange?: SegmentedProps["onChange"];
}) {
  const translate = useTranslate();
  
  const getColor = (value: string) => {
    return paymentMethodOptions.find((item) => item.value === value)?.color;
  }
  return (
    <Segmented
      value={value}
      onChange={onChange}
      options={paymentMethodOptions.map((item) => ({
        value: item.value,
        label: <BadgeField value={translate(`payment_types.enums.payment_method.${item.value}`)} color={getColor(item.value)}/>,
      }) )}
    />
  );
}