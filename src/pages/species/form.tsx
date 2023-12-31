import { useParsed, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { FormProps } from "antd/lib";

export const SpeciesForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  return (
    <Form
      {...formProps}
      onFinish={(values) => {
        return formProps.onFinish?.({
          ...values,
          tenant_id: params?.tenant as string,
        });
      }}
      layout="vertical"
    >
      <Form.Item
        label={translate("species.fields.name")}
        name={["name"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("species.fields.description")}
        name={["description"]}
      >
        <Input.TextArea autoSize={{ minRows: 2 }} />
      </Form.Item>
    </Form>
  );
};
