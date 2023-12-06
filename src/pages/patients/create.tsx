import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, UseDrawerFormReturnType, useSelect } from "@refinedev/antd";
import { Drawer } from "antd";

import { Tables } from "../../types/supabase";
import { PatientForm } from "./form";

export const PatientCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'patients'>> }>  = ({
  drawerFormProps,
}) => {
  const translate = useTranslate();

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <Drawer {...drawerProps} title={translate("species.create.title")}>
      <Create saveButtonProps={saveButtonProps}>
        <PatientForm formProps={formProps} />
      </Create>
    </Drawer>
  );
};
