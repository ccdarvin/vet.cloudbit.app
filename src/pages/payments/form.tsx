import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Descriptions, Form, Input, InputNumber, Row } from "antd";
import { FormProps } from "antd/lib";
import PaymentTypeSelect from "../../components/controls/PaymentTypeSelect";
import { Tables } from "../../types/supabase";

export const PaymentForm: React.FC<{
  formProps: FormProps;
  order: Tables<"orders">
}> = ({ formProps, order }) => {
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
          order_id: order.id,
        });
      }}
    >
      <Descriptions title={``} bordered>
        <Descriptions.Item label={translate("orders.fields.total")}>
          {order.total}
        </Descriptions.Item>
        <Descriptions.Item label={translate("orders.fields.total_paid")}>
          {order.total_paid}
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("payments.fields.payment_type")}
            name={["payment_type_id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <PaymentTypeSelect />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("payments.fields.amount")}
            name={["amount"]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
