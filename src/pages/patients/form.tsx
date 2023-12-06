import { useParsed, useTranslate } from "@refinedev/core";
import { DatePicker, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import dayjs from "dayjs";
import SpeciesSelect from "../../components/controls/SpeciesSelect";
import BreedsSelect from "../../components/controls/BreedsSelect";

export const PatientForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const species_id = Form.useWatch('species_id', { form: formProps.form });

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
        label={translate("patients.fields.name")}
        name={["name"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("patients.fields.species_id")}
        name={"species_id"}
      >
        <SpeciesSelect />
      </Form.Item>
      <Form.Item
        label={translate("patients.fields.breed_id")}
        name={"breed_id"}
      >
        <BreedsSelect species_id={species_id}/>
      </Form.Item>
      <Form.Item
        label={translate("patients.fields.birthday")}
        name={["birthday"]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={translate("patients.fields.sex")}
        name={["sex"]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
