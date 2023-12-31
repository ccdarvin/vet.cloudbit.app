import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { ItemForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const ItemsCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"items">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <ItemForm formProps={formProps} />
    </CreateDrawer>
  );
};
