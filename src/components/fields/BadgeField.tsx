import { Badge } from "antd";

export default function BadgeField({
  value,
  color,
}: {
  value?: string;
  color?: string;
}) {
  return <Badge color={color} text={value} />;
}
