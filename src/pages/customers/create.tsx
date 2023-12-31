import { UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core"
import { Tables } from "../../types/supabase";
import { CustomerForm } from "./form";
import CreateDrawer from "../../components/crud/CreateDrawer";

export const CustomerCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'customers'>> }> = ({
    drawerFormProps,
  }) => {
  
    const { formProps, drawerProps, saveButtonProps } = drawerFormProps;
    
    return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <CustomerForm formProps={formProps} />
      </CreateDrawer>
    );
  };