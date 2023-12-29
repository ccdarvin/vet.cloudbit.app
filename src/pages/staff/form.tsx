import { useParsed, useTranslate } from "@refinedev/core";
import {
  Col,
  Form,
  Input,
  Row,
  Switch,
} from "antd";
import { FormProps } from "antd/lib";

export const StaffForm: React.FC<{ formProps: FormProps }> = ({
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
            label={translate("staff.fields.first_name")}
            name={["first_name"]}
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
            label={translate("staff.fields.last_name")}
            name={["last_name"]}
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
            label={translate("staff.fields.email")}
            name={["email"]}
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("staff.fields.phone")}
            name={["phone"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("staff.fields.is_doctor")}
            valuePropName="checked"
            name={["is_doctor"]}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
