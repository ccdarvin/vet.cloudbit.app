import { Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";


export default function BreedsSelect({
  species_id,
  ...props
}: SelectProps & { species_id?: string }) {


  const { params } = useParsed<{ tenant: string }>();

  const { selectProps } = useSelect({
    resource: "breeds",
    optionLabel: "name",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    },{
      field: "species_id",
      operator: "eq",
      value: species_id
    }],
    queryOptions: {
      enabled: !!species_id
    }
  })

  return (
    <Select {...props} {...selectProps} disabled={!species_id}/>
  )
}