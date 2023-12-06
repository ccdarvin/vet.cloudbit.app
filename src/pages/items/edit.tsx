import { Edit, UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { Drawer } from "antd";
import { ItemForm } from "./form";


export const ItemsEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"items">>;
  }
> = ({ drawerFormProps }) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <Drawer {...drawerProps}>
      <Edit saveButtonProps={saveButtonProps}>
        <ItemForm formProps={formProps} />
      </Edit>
    </Drawer>
  );
};
