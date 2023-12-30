import { useParsed, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { FormProps } from "antd/lib";

export const NotesForm: React.FC<{ 
  formProps: FormProps
  objectId: string
  objectType: string
 }> = ({
  formProps,
  objectId,
  objectType
}) => {
  const { params } = useParsed<{ tenant: string }>();

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values) => {
        return formProps.onFinish?.({
          ...values,
          tenant_id: params?.tenant as string,
          object_id: objectId,
          object_type: objectType
        });
      }}
    >
      <Form.Item
        name={["note"]}
        noStyle
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea autoSize={{ minRows: 2 }} 
          placeholder="Agregar una nota"
        />
      </Form.Item>
    </Form>
  );
};
