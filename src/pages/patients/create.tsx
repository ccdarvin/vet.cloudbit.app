import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, UseDrawerFormReturnType, useSelect } from "@refinedev/antd";
import { Drawer } from "antd";

import { Tables } from "../../types/supabase";
import { PatientForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const PatientCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'patients'>> }>  = ({
  drawerFormProps,
}) => {
  const translate = useTranslate();

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <PatientForm formProps={formProps} />
      </CreateDrawer>
  );
};
