import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { TreatmentTypeForm } from "./form";
import EditDrawer from "../../components/crud/EditDrawer";

export const TreatmentTypesEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"treatment_types">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <TreatmentTypeForm formProps={formProps} />
    </EditDrawer>
  );
};
