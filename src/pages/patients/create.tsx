import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import { PatientForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const PatientCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'patients'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <PatientForm formProps={formProps} />
      </CreateDrawer>
  );
};
