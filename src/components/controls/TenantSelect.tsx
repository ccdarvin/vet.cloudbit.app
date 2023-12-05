import { useSelect } from "@refinedev/antd";
import { useGetToPath, useGo, useParsed } from "@refinedev/core";
import { Select } from "antd";
import { Tables } from "../../types/supabase";


export default function TenantSelect() {
  const getToPath = useGetToPath();
  const go = useGo();
  const { resource, action, params } = useParsed<{ tenant: string }>();

  const { selectProps: storeSelectProps, queryResult } = useSelect<Tables<'tenants'>>({
    resource: "tenants",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Select
      defaultValue={params?.tenant}
      style={{ width: 120 }}
      onChange={(tenant) =>
        go({
          to: getToPath({
            resource,
            action: action || "list",
            meta: {
              tenant,
            },
          }),
        })
      }
      onSelect={() => false}
    >
      {storeSelectProps.options?.map(({ value, label }) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};