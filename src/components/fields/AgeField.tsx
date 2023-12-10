import { Tooltip } from "antd";
import { useTranslate } from "@refinedev/core";
import { DateFieldProps } from "@refinedev/antd";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";


export default function AgeField({
  value,
  locales,
  format: dateFormat = "L",
  ...rest
}: DateFieldProps) {
  const birthDate = new Date(value as string);
  const defaultLocale = dayjs.locale();
  const translate = useTranslate();

  const getAge = () => {
    dayjs.extend(LocalizedFormat);
    // calculate age and month
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    /*if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
      month = 12 + month;
    }*/
    if (age === 0) {
      return `${month} ${translate('common:months')}`;
    } else if (month === 0) {
      return `${age} ${translate('common:years')}`;
    }
    return `${age} ${translate('common:years')} ${month} ${translate('common:months')}`;
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