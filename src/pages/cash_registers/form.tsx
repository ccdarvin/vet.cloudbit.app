import { useParsed, useTranslate } from "@refinedev/core";
import { Form, DatePicker } from "antd";
import { FormProps } from "antd/lib";

export const CashRegisterForm: React.FC<{ formProps: FormProps }> = ({
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
        label={translate("cash_registers.fields.open_at")}
        name="open_at"
        rules={[{ required: true }]}
      >
        <DatePicker showTime showSecond={false} format={'YYYY-MM-DD HH:mm'} />
      </Form.Item>
      <Form.Item
        label={translate("cash_registers.fields.initial_balance")}
        name="initial_balance"
        rules={[{ required: true }]}
      >
        <Number />
      </Form.Item>
    </Form>
  );
};
