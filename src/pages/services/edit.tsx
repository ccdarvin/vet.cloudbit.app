import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import { VaccineForm } from "./form";
import EditDrawer from "../../components/crud/EditDrawer";

export const VaccioneEdit: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'patients'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <VaccineForm formProps={formProps} />
      </EditDrawer>
  );
};
