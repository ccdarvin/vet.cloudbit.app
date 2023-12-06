import { Create, UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { Drawer } from "antd";
import { ItemForm } from "./form";


export const ItemsCreate: React.FC<
IResourceComponentsProps & {
  drawerFormProps: UseDrawerFormReturnType<Tables<"items">>;
}
> = ({ drawerFormProps }) => {

const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

return (
  <Drawer {...drawerProps}>
    <Create saveButtonProps={saveButtonProps}>
      <ItemForm formProps={formProps} />
    </Create>
  </Drawer>
);
};
