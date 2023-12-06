import { useParsed, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { FormProps } from "antd/lib";

export const CustomerForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
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
        });
      }}
    >
      <Form.Item
        label={translate("customers.fields.name")}
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
        label={translate("customers.fields.doc_number")}
        name={["doc_number"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("customers.fields.email")}
        name={["email"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("customers.fields.phone")}
        name={["phone"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("customers.fields.address")}
        name={["address"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("customers.fields.address_ref")}
        name={["address_ref"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
