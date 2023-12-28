import { Select, Space } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";




export default function PatientSelect({
  ...props
}: SelectProps) {

  const { params } = useParsed<{ tenant: string }>();

  const { selectProps, queryResult } = useSelect<Tables<'patients'>>({
    resource: "patients",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
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
            label={item.name}
            item={item}
          >
            <Space>
              {item.name}
            </Space>
          </Select.Option>
        ))}
      </Select>
    </>
  )
}