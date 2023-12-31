import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import EditDrawer from "../../components/crud/EditDrawer";
import { PaymentTypeForm } from "./form";

export const PaymentTypesEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"payment_types">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <PaymentTypeForm formProps={formProps} />
    </EditDrawer>
  );
};
