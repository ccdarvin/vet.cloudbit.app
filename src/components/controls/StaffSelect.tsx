import { Select, Space } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";




export default function StaffSelect({
  isDoctor,
  ...props
}: SelectProps & { isDoctor?: boolean }) {

  const { params } = useParsed<{ tenant: string }>();

  const { selectProps, queryResult } = useSelect<Tables<'staff'>>({
    resource: "staff",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    },{
      field: "is_doctor",
      operator: "eq",
      value: isDoctor
    }]
  });

  return (
    <>
      <Select
        style={{
          width: "100%"
        }}
        placeholder="Seleccione un paciente"
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
            label={item.first_name + " " + item.last_name}
            item={item}
          >
            <Space>
              {item.first_name} {item.last_name}
            </Space>
          </Select.Option>
        ))}
      </Select>
    </>
  )
}