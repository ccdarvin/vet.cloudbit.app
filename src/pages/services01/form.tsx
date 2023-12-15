import { useParsed, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { FormProps } from "antd/lib";

export const ServiceForm: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values) => {
        return formProps.onFinish?.({
          ...values,
          tenant_id: params?.tenant as string,
          is_service: true,
        });
      }}
    >
      <Form.Item
        label={translate("items.fields.name")}
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
        label={translate("items.fields.price")}
        name={["price"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("items.fields.type")}
        name={["type"]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("items.fields.description")}
        name={["description"]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
