import { Select, Space, Typography } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";




export default function AppointmentSelect({
  isAvailable,
  ...props
}: SelectProps & { isAvailable?: boolean }) {

  const { params } = useParsed<{ tenant: string, patient: string }>();

  const isStatus: string[] = []
  if (isAvailable){
    isStatus.push("Pending")
    isStatus.push("Confirmed")
    isStatus.push("InProcess")
  }

  const { selectProps, queryResult } = useSelect<Tables<'appointments'>>({
    resource: "appointments",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    },{
      field: "patient_id",
      operator: "eq",
      value: params?.patient
    },{
      field: "status",
      operator: "in",
      value: isStatus
    }]
  });

  const placeholder = "selecciona una cita o visita"

  return (
    <>
      <Select
        style={{
          width: "100%"
        }}
        optionLabelProp="label"
        placeholder={placeholder}
        {...props} {...selectProps}
        options={undefined}
        dropdownRender={(menu) => (<>
          {menu}
        </>)}
      >
        {queryResult?.data?.data?.map((item) => (
          <Select.Option 
            key={item.id} 
            value={item.id}
            label={item.reason}
            item={item}
          >
            <Space direction="vertical">
              {item.reason}
              <Typography.Text type="secondary">
                {item.date}
              </Typography.Text>
            </Space>
          </Select.Option>
        ))}
      </Select>
    </>
  )
}