import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { MedicalRecordForm } from "./form";

export const MedicalRecordsCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"medical_records">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  const { params } = useParsed<{ patient: string }>();

  formProps.initialValues = {
    status: "Pending",
    patient_id: params?.patient,
  };

  return (
    <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <MedicalRecordForm formProps={formProps} />
    </CreateDrawer>
  );
};
