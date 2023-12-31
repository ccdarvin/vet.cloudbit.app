import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { PaymentTypeForm } from "./form";

export const PaymentTypesCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"payment_types">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <PaymentTypeForm formProps={formProps} />
    </CreateDrawer>
  );
};
