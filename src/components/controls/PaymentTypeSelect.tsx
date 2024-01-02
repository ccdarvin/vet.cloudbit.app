import { Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";




export default function PaymentTypeSelect({
  ...props
}: SelectProps) {

  const { params } = useParsed<{ tenant: string }>();

  const { selectProps } = useSelect({
    resource: "payment_types",
    optionLabel: "name",
    filters: [{
      field: "tenant_id",
      operator: "eq",
      value: params?.tenant
    }]
  });

  return (
    <Select 
    {...props} {...selectProps}
    />
  )
}