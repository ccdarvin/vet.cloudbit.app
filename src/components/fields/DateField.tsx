import React from "react";
import { Typography } from "antd";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import type { DateFieldProps } from "@refinedev/antd";

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/fields/date} for more details.
 */
export default function DateField ({
  value,
  locales,
  format: dateFormat = "L",
  ...rest
}: DateFieldProps) {
  dayjs.extend(LocalizedFormat);

  const defaultLocale = dayjs.locale();

  const { Text } = Typography;

  if (value) {
    return (
      <Text {...rest}>
        {dayjs(value)
          .locale(locales || defaultLocale)
          .format(dateFormat)}
      </Text>
    );
  }

  return (
    <Text {...rest}>
      <span style={{ color: "#ccc" }}>—</span>
    </Text>
  )
};
