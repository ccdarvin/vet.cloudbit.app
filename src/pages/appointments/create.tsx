import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import { AppointmentForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const AppointmentsCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"patients">>;
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
      <AppointmentForm formProps={formProps} />
    </CreateDrawer>
  );
};
