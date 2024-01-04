
import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import EditDrawer from "../../components/crud/EditDrawer";
import { AppointmentForm } from "./form";

export const AppointmentsEdit: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'appointments'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <AppointmentForm formProps={formProps} />
    </EditDrawer>
  );
};