import { Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";




export default function ItemSelect({
  ...props
}: SelectProps) {

  const { params } = useParsed<{ tenant: string }>();

  const { selectProps, queryResult } = useSelect<Tables<'items'>>({
    resource: "items",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    }]
  });
  return (
    <Select
    style={{
      width: "100%"
    }}
    placeholder="Seleccione un producto"
    {...props} {...selectProps}
    options={undefined}
    >
      {queryResult?.data?.data?.map((item) => (
        <Select.Option 
          key={item.id} 
          value={item.id}
          item={item}
        >
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}