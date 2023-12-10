import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import { PatientForm } from "./form";
import EditDrawer from "../../components/crud/EditDrawer";

export const PatientEdit: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'patients'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <PatientForm formProps={formProps} />
    </EditDrawer>
  );
};