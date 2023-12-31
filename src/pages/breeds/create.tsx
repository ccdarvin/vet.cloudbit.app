import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { BreedForm } from "./form";

export const BreedsCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"breeds">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <CreateDrawer resource="breeds" drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <BreedForm formProps={formProps} />
    </CreateDrawer>
  );
};
