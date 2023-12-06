import {
  IResourceComponentsProps,
  useTranslate,
  useParsed,
} from "@refinedev/core";
import { Create, UseDrawerFormReturnType } from "@refinedev/antd";
import { Form, Input, Drawer } from "antd";
import { Tables } from "../../types/supabase";
import SpeciesSelect from "../../components/controls/SpeciesSelect";

export const BreedsCreateOrEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"breeds">>;
    species_id?: string;
  }
> = ({ drawerFormProps }) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <Drawer {...drawerProps} title={translate("species.create.title")}>
      <Create saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          onFinish={(values) => {
            return formProps.onFinish?.({
              ...values,
              tenant_id: params?.tenant as string,
            });
          }}
          layout="vertical"
        >
          <Form.Item
            label={translate("species.fields.species_id")}
            name={["species_id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SpeciesSelect />
          </Form.Item>
          <Form.Item
            label={translate("species.fields.name")}
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
            label={translate("species.fields.description")}
            name={["description"]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};
