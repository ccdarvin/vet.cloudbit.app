import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { TreatmentTypeForm } from "./form";

export const TreatmentTypesCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'treatment_types'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <TreatmentTypeForm formProps={formProps} />
      </CreateDrawer>
  );
};

