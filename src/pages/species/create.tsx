import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";
import { Tables } from "../../types/supabase";
import { SpeciesForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const SpeciesCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'species'>> }> = ({
  drawerFormProps,
}) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <CreateDrawer resource="species" drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <SpeciesForm formProps={formProps} />
    </CreateDrawer>
  );
};
