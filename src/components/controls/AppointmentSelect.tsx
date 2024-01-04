import { Checkbox, Select, Space, Typography } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useOne, useParsed, useTranslate } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { useEffect, useState } from "react";
import { appointmentStatusOptions } from "../../constants";

export default function AppointmentSelect({ ...props }: SelectProps) {
  const { params } = useParsed<{ tenant: string; patient: string }>();
  const translate = useTranslate();
  const [statusList, setStatusList] = useState<string[]>([
    "Pending",
    "Confirmed",
    "InProcess",
  ]);

  const [data, setData] = useState<Tables<"appointments">[]>([])
  

  const { selectProps, queryResult } = useSelect<Tables<"appointments">>({
    resource: "appointments",
    filters: [
      {
        field: "tenant_id",
        operator: "eq",
        value: params?.tenant,
      },
      {
        field: "patient_id",
        operator: "eq",
        value: params?.patient,
      },
      {
        field: "status",
        operator: "in",
        value: statusList,
      }
    ],
  });

  const { data: dataOne } = useOne<Tables<"appointments">>({
    resource: "appointments",
    id: props.value as string,
    queryOptions:{
      enabled: props.value !== undefined
    }
  })

  useEffect(() => {
    // union two arrays
    const union = []
    queryResult?.data?.data && union.push(...(queryResult?.data?.data ?? []))
    // add if not exists
    console.log(dataOne?.data && !union.find(item => item.id === dataOne.data.id))
    dataOne?.data && !union.find(item => item.id === dataOne.data.id) && union.push(dataOne.data)
    setData(union as Tables<"appointments">[]);
  }, [dataOne, queryResult?.data?.data])

  const placeholder = "selecciona una cita o visita";

  return (
    <Space.Compact block>
      <Select
        style={{
          width: "100%",
        }}
        optionLabelProp="label"
        placeholder={placeholder}
        {...props}
        {...selectProps}
        options={undefined}
        dropdownRender={(menu) => (
          <>
            <Checkbox.Group
              style={{
                width: "100%",
                padding: "0 8px",
              }}
              value={statusList}
              options={appointmentStatusOptions.map((item) => ({
                label: translate('appointments.enums.status.' + item.value),
                value: item.value,
              }))}
              onChange={(value) => {
                setStatusList(value as string[]);
              }}
            />
            {menu}
          </>
        )}
      >
        {data?.map((item) => (
          <Select.Option
            key={item.id}
            value={item.id}
            label={item.reason}
            item={item}
          >
            <Space direction="vertical">
              {item.reason}
              <Typography.Text type="secondary">{item.date}</Typography.Text>
            </Space>
          </Select.Option>
        ))}
      </Select>
    </Space.Compact>
  );
}
