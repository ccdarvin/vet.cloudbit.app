import { Card, Tag } from "antd";
import { useTranslate } from "@refinedev/core";
import { orderStatusOptions } from "../../constants";
import { Tables } from "../../types/supabase";

export default function OrderStatusField({ value, order }: { value?: string, order?: Tables<"orders"> }) {
  const translate = useTranslate();
  const getColor = (status?: string) => {
    return orderStatusOptions.find((option) => option.value === status)?.color;
  };

  return (
    <Card
      title={translate("orders.fields.status")}
      extra={<Tag color={getColor(value)}>{translate(`orders.enums.status.${value}`)}</Tag>} 
    >

    </Card>
  );
}
