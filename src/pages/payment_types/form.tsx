import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Form, Input, Row } from "antd";
import { FormProps } from "antd/lib";
import PaymentMethodSegmented from "../../components/controls/PaymentMethodSegmented";

export const PaymentTypeForm: React.FC<{ formProps: FormProps }> = ({
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
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("payment_types.fields.name")}
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
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("payment_types.fields.payment_method")}
            name={["payment_method"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <PaymentMethodSegmented />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("payment_types.fields.description")}
            name={["description"]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
