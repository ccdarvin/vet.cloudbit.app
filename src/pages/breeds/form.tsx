import { useParsed, useTranslate } from "@refinedev/core";
import { Col, Form, Input, Row } from "antd";
import { FormProps } from "antd/lib";
import SpeciesSelect from "../../components/controls/SpeciesSelect";

export const BreedForm: React.FC<{ formProps: FormProps }> = ({
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
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("species.fields.species")}
            name={["species_id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SpeciesSelect />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("breeds.fields.name")}
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
        <Col xs={{ span: 24 }}>
          <Form.Item
            label={translate("breeds.fields.description")}
            name={["description"]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
