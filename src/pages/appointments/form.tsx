import { useParsed, useTranslate } from "@refinedev/core";
import { DatePicker, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import PatientSelect from "../../components/controls/CustomerSelect copy";
import dayjs from "dayjs";
import AppointmentStatusSegmented from "../../components/controls/AppointmentStatus";


export const AppointmentForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const { params } = useParsed<{ tenant: string }>();
  const translate = useTranslate();

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
        label={translate("appointments.fields.patient_id")}
        name={"patient_id"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <PatientSelect />
      </Form.Item>
      <Form.Item
        label={translate("appointments.fields.date")}
        name={["date"]}
        rules={[
          {
            required: true,
          },
        ]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker showTime showSecond={false} format={'YYYY-MM-DD HH:mm'} />
      </Form.Item>
      <Form.Item
        label={translate("appointments.fields.reason")}
        name={["reason"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea  autoSize={{ minRows: 2 }}/>
      </Form.Item>
      <Form.Item
        label={translate("appointments.fields.status")}
        name={["status"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AppointmentStatusSegmented />
      </Form.Item>
    </Form>
  );
};
