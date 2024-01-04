import {
  IResourceComponentsProps,
  useList,
  useParsed,
  useTranslate,
} from "@refinedev/core";
import { Badge, Calendar, Drawer, List, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { useEffect, useState } from "react";
import { IAppointment } from "../../../types/interfaces";
import { appointmentStatusOptions } from "../../../constants";
import { Flex } from "antd/lib";
import DateField from "../../../components/fields/DateField";
import { EditButton, useDrawerForm } from "@refinedev/antd";
import { Tables } from "../../../types/supabase";
import { AppointmentsEdit } from "../edit";

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
  const drawerFormPropsEdit = useDrawerForm<Tables<"appointments">>({
    action: "edit",
    syncWithLocation: true,
  });

  const [selectDate, setSelectDate] = useState<Dayjs | undefined>();

  const renderAppointmentDetail = (items?: IAppointment[]) => {
    return (
      <List>
        {items?.map((item) => (
          <List.Item
            key={item.id}
            actions={[
              <EditButton
                hideText
                key="edit"
                onClick={() => {
                  drawerFormPropsEdit.show(item.id);
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.doctor?.first_name + " " + item.doctor?.last_name}
              description={
                <Flex vertical>
                  <div>
                    <DateField
                      type="secondary"
                      value={item.date}
                      format="HH:mm"
                    />
                  </div>
                  <div>
                    <Typography.Text>{item.patient?.name}</Typography.Text>
                  </div>
                </Flex>
              }
            />
            <Badge
              text={translate(`appointments.enums.status.${item.status}`)}
              color={
                appointmentStatusOptions.find(
                  (status) => status.value === item.status
                )?.color
              }
            />
          </List.Item>
        ))}
      </List>
    );
  };

  const renderDrawer = (items?: IAppointment[]) => {
    return (
      <Drawer
        title={selectDate?.format("DD/MM/YYYY")}
        placement="right"
        onClose={() => {
          setSelectDate(undefined);
        }}
        open={!!selectDate}
        width={500}
      >
        {renderAppointmentDetail(items)}
        <AppointmentsEdit drawerFormProps={drawerFormPropsEdit} />
      </Drawer>
    );
  }

  const dateCellRender = (value: Dayjs) => {
    const dataByDate = data?.data.filter((item) =>
      dayjs(item.date).isSame(value, "day")
    );
    return (
        <Flex vertical>
          {dataByDate?.map((item) => (
            <Badge
              key={item.id}
              text={translate(`appointments.enums.status.${item.status}`)}
              color={
                appointmentStatusOptions.find(
                  (status) => status.value === item.status
                )?.color
              }
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
        order: "asc",
      },
    ],
  });

  return (
    <>
      <Calendar
        cellRender={cellRender}
        value={undefined}
        onSelect={(date, info) => {
          if (info?.source === "month") {
            setMonth(date.month());
          } else if (info?.source === "year") {
            setYear(date.year());
          } else if (info?.source === "date") {
            setSelectDate(date);
          }
        }}
      />
      {renderDrawer(data?.data.filter((item) =>
        dayjs(item.date).isSame(selectDate, "day")
        ))}
    </>
  );
};
