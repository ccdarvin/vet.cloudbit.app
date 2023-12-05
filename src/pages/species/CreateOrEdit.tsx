import { IResourceComponentsProps, useTranslate, useParsed } from "@refinedev/core";
import { Create, UseDrawerFormReturnType } from "@refinedev/antd";
import { Form, Input, Drawer } from "antd";
import { Tables } from "../../types/supabase";

export const SpeciesCreateOrEdit: React.FC<IResourceComponentsProps & { drawerFormProps: UseDrawerFormReturnType<Tables<'species'>> }> = ({
  drawerFormProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();


  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <Drawer {...drawerProps} title={translate("species.create.title")}>
      <Create saveButtonProps={saveButtonProps}>
        <Form 
          {...formProps}
          onFinish={(values) => {
            return (
                formProps.onFinish?.({
                    ...values,
                    tenant_id: params?.tenant as string,
                })
            );
          }}
          layout="vertical"
        >
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
