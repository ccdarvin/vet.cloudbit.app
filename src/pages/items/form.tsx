import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Form, Input, InputNumber, Row, Switch } from "antd";
import { FormProps } from "antd/lib";

export const ItemForm: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
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
          is_service: false,
        });
      }}
    >
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
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
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("items.fields.is_service")}
            name={["is_service"]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("items.fields.sku")} name={["sku"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("items.fields.ean")} name={["ean"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("items.fields.price")} name={["price"]}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("items.fields.cost")} name={["cost"]}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("items.fields.stock")} name={["stock"]}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("items.fields.description")}
            name={["description"]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
