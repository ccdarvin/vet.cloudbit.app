import { IResourceComponentsProps, useList, useParsed, useTranslate } from "@refinedev/core";
import { Badge, Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { useEffect, useState } from "react";
import { IAppointment } from "../../../types/interfaces";
import { appointmentStatusOptions } from "../../../constants";
import { Flex } from "antd/lib";


export const AppointmentsCalendar: React.FC<IResourceComponentsProps> = () => {

  const translate = useTranslate();

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const dataByDate = data?.data.filter((item) => dayjs(item.date).isSame(value, "day"));
    return (
      <Flex vertical>
        {dataByDate?.map((item) => (
            <Badge 
              key={item.id}
              text={translate(`appointments.enums.status.${item.status}`)}
              color={appointmentStatusOptions.find((status) => status.value === item.status)?.color}
            />
        ))}
      </Flex>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const [month, setMonth] = useState<number>(dayjs().month());
  const [year, setYear] = useState<number>(dayjs().year());
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();

  useEffect(() => {
    // generate range with month and year
    setStartDate(dayjs().month(month).year(year).startOf("month"));
    setEndDate(dayjs().month(month).year(year).endOf("month"));
  }, [month, year]);
  const { params } = useParsed<{ tenant: string; patient: string }>();
  const { data } = useList<IAppointment>({
    meta: {
      select: "*, patient:patient_id(*), doctor:doctor_id(*)",
    },
    filters: [
      {
        field: "tenant_id",
        operator: "eq",
        value: params?.tenant,
      },
      {
        field: "date",
        operator: "gte",
        value: startDate?.toISOString(),
      },
      {
        field: "date",
        operator: "lte",
        value: endDate?.toISOString(),
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  });

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode?.toString());
  };

  return (
    <Calendar
      cellRender={cellRender}
      onPanelChange={onPanelChange}
      onSelect={(date, info) => {
        if (info?.source === "month") {
          setMonth(date.month());
        } else if (info?.source === "year") {
          setYear(date.year());
        }
      }}
    />
  );
};
