import { Button, Select, Space } from "antd";
import { useDrawerForm, useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { CustomerCreate, CustomerEdit } from "../../pages/customers";




export default function CustomerSelect({
  ...props
}: SelectProps) {

  const { params } = useParsed<{ tenant: string }>();

  const { selectProps, queryResult } = useSelect<Tables<'items'>>({
    resource: "customers",
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
        placeholder="Seleccione un cliente"
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