import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Form, Input, Row } from "antd";
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
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>

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
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <Form.Item
          label={translate("customers.fields.doc_number")}
          name={["doc_number"]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>

        <Form.Item
          label={translate("customers.fields.email")}
          name={["email"]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>

        <Form.Item
          label={translate("customers.fields.phone")}
          name={["phone"]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <Form.Item
          label={translate("customers.fields.address")}
          name={["address"]}
        >
          <Input.TextArea autoSize={{minRows: 2}} />
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <Form.Item
          label={translate("customers.fields.address_ref")}
          name={["address_ref"]}
        >
          <Input.TextArea autoSize={{minRows: 2}} />
        </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
