import { Flex, Select, Space, Typography } from "antd";
import { useSelect } from "@refinedev/antd";
import { SelectProps } from "antd/lib";
import { useParsed } from "@refinedev/core";
import { Tables } from "../../types/supabase";

export default function TreatmentTypeSelect({ ...props }: SelectProps) {
  const { params } = useParsed<{ tenant: string }>();

  const { selectProps, queryResult } = useSelect<Tables<"treatment_types">>({
    resource: "treatment_types",
    filters: [
      {
        field: "tenant_id",
        operator: "eq",
        value: params?.tenant,
      },
    ],
  });

  return (
    <>
      <Select
        style={{
          width: "100%",
        }}
        placeholder="Seleccione un tipo de tratamiento"
        optionLabelProp="label"
        {...props}
        {...selectProps}
        options={undefined}
        dropdownRender={(menu) => <>{menu}</>}
      >
        {queryResult?.data?.data?.map((item) => (
          <Select.Option
            key={item.id}
            value={item.id}
            label={item.name}
            item={item}
          >
            <Flex vertical>
              <Typography.Text>{item.name}</Typography.Text>
              <Typography.Text type="secondary">
                {item.description}
              </Typography.Text>
            </Flex>
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
