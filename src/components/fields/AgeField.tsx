import { Tooltip } from "antd";
import { useTranslate } from "@refinedev/core";
import { DateFieldProps } from "@refinedev/antd";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";


export default function AgeField({
  value,
  locales,
  format: dateFormat = "L",
}: DateFieldProps) {
  const birthDate = new Date(value as string);
  const defaultLocale = dayjs.locale();
  const translate = useTranslate();

  const getAge = () => {
    dayjs.extend(LocalizedFormat);
    // calculate age and month
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    /*if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
      month = 12 + month;
    }*/
    if (age === 0) {
      return `${month} ${translate('calendar.months')}`;
    } else if (month === 0) {
      return `${age} ${translate('calendar.years')}`;
    }
    return `${age} ${translate('calendar.years')} ${month} ${translate('calendar.months')}`;
  }

  if (!value) {
    return (
        <span>{"-"}</span>
    )
  }
  return (
    <Tooltip title={{birthDate}.birthDate ? dayjs(birthDate).locale(locales || defaultLocale).format(dateFormat) : dayjs(birthDate).locale(locales || defaultLocale).format(dateFormat)} placement="top">
      <span>{getAge()}</span>
    </Tooltip>
  )
}