import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Form, Input, Row } from "antd";
import { FormProps } from "antd/lib";
import PatientSelect from "../../components/controls/PatientSelect";
import StaffSelect from "../../components/controls/StaffSelect";
import AppointmentSelect from "../../components/controls/AppointmentSelect";

export const MedicalRecordForm: React.FC<{ formProps: FormProps }> = ({
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
            label={translate("medical_records.fields.appointment")}
            name={"appointment_id"}
          >
            <AppointmentSelect isAvailable />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("medical_records.fields.patient")}
            name={"patient_id"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <PatientSelect />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("medical_records.fields.doctor")}
            name={"doctor_id"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <StaffSelect isDoctor />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("medical_records.fields.symptoms")}
            name={["symptoms"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("medical_records.fields.diagnosis")}
            name={["diagnosis"]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("medical_records.fields.treatment")}
            name={["treatment"]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};