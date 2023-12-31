import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { CashRegisterForm } from "./form";

export const CashRegisterCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'cash_registers'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <CashRegisterForm formProps={formProps} />
      </CreateDrawer>
  );
};

