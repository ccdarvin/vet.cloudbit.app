import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { PaymentForm } from "./form";

export const PaymentsCreate: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"payments">>;
    order: Tables<"orders">;
  }
> = ({ drawerFormProps, order }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  const getBalance = () => {
    if (!order.total || !order.total_paid) {
      return 0;
    }
    return order.total - order.total_paid;
  }

  formProps.initialValues = {
    amount: getBalance(),
  };
  return (
    <CreateDrawer 
      resource="payments"
      drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
      <PaymentForm formProps={formProps} order={order} />
    </CreateDrawer>
  );
};
