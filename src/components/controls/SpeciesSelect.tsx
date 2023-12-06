import { Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";




export default function SpeciesSelect({
  ...props
}: SelectProps) {


  const { params } = useParsed<{ tenant: string }>();

  const { selectProps: speciesSelectProps } = useSelect({
    resource: "species",
    optionLabel: "name",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    }]
  });

  return (
    <Select {...props} {...speciesSelectProps} />
  )
}