import { Edit, UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core"
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { CustomerForm } from "./form";

export const CustomerEdit: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'customers'>> }> = ({
    drawerFormProps,
  }) => {
  
    const { formProps, drawerProps, saveButtonProps } = drawerFormProps;
    
    return (
      <Drawer {...drawerProps}>
        <Edit saveButtonProps={saveButtonProps}>
          <CustomerForm formProps={formProps} />
        </Edit>
      </Drawer>
    );
  };
  