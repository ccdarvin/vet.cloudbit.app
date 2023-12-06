import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, UseDrawerFormReturnType } from "@refinedev/antd";
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { ServiceForm } from "./form";

export const ServicesEdit: React.FC<IResourceComponentsProps 
& { drawerFormProps: UseDrawerFormReturnType<Tables<'items'>> }> = ({
    drawerFormProps,
  }) => {
  
    const { formProps, drawerProps, saveButtonProps } = drawerFormProps;
    
    return (
      <Drawer {...drawerProps}>
        <Edit saveButtonProps={saveButtonProps}>
          <ServiceForm formProps={formProps} />
        </Edit>
      </Drawer>
    );
  };