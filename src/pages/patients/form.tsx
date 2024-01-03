import { useParsed, useTranslate } from "@refinedev/core";
import { Col, DatePicker, Form, Input, Row, Select, Slider, Switch } from "antd";
import { FormProps } from "antd/lib";
import dayjs from "dayjs";
import SpeciesSelect from "../../components/controls/SpeciesSelect";
import BreedsSelect from "../../components/controls/BreedsSelect";
import CustomerSelect from "../../components/controls/CustomerSelect";

export const PatientForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  const species_id = Form.useWatch("species_id", { form: formProps.form });

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
          label={translate("patients.fields.customer")}
          name={["customer_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomerSelect />
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
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
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.species")}
            name={"species_id"}
          >
            <SpeciesSelect />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.breed")}
            name={"breed_id"}
          >
            <BreedsSelect species_id={species_id} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.birthday")}
            name={["birthday"]}
            getValueProps={(value) => ({
              value: value ? dayjs(value) : undefined,
            })}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item label={translate("patients.fields.sex")} name={["sex"]}>
            <Select
              options={[
                { label: translate("patients.enums.M"), value: "M" },
                { label: translate("patients.enums.F"), value: "F" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.color")}
            name={["color"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.microchip")}
            name={["microchip"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.weight")}
            name={["passport"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item 
            label={translate("patients.fields.last_heat")} 
            name={["last_heat"]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("patients.fields.aggressiveness")}
            name={["aggressiveness"]}
          >
            <Slider max={10} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.meal")}
            name={["meal"]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.observations")}
            name={["observations"]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.is_castrated")}
            name={["is_castrated"]}
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <Form.Item
            label={translate("patients.fields.is_dead")}
            name={["is_dead"]}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
