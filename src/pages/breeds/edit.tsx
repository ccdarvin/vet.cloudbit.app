import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import EditDrawer from "../../components/crud/EditDrawer";
import { BreedForm } from "./form";

export const BreedsEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"breeds">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer resource="breeds" drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <BreedForm formProps={formProps} />
    </EditDrawer>
  );
};
