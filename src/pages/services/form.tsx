import { useParsed, useTranslate } from "@refinedev/core";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Switch,
} from "antd";
import { FormProps } from "antd/lib";
import dayjs from "dayjs";

export const VaccineForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string, patient: string }>();

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values) => {
        return formProps.onFinish?.({
          ...values,
          tenant_id: params?.tenant as string,
          patient_id: params?.patient as string,
        });
      }}
    >
      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("vaccines.fields.name")}
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
            label={translate("vaccines.fields.date")}
            name={["date"]}
            getValueProps={(value) => ({
              value: value ? dayjs(value) : undefined,
            })}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("vaccines.fields.is_done")}
            name={["has"]}
          >
            <Switch />
          </Form.Item>
        </Col> 
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("vaccines.fields.observations")}
            name={["observations"]}
          >
            <Input.TextArea  autoSize/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
