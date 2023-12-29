import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import EditDrawer from "../../components/crud/EditDrawer";
import { MedicalRecordForm } from "./form";

export const MedicalRecordsEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"medical_records">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <MedicalRecordForm formProps={formProps} />
    </EditDrawer>
  );
};
