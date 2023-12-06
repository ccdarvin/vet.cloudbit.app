import { IResourceComponentsProps } from "@refinedev/core";
import { Create, UseDrawerFormReturnType } from "@refinedev/antd";
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { ServiceForm } from "./form";

export const ServicesCreate: React.FC<IResourceComponentsProps 
& { drawerFormProps: UseDrawerFormReturnType<Tables<'items'>> }> = ({
    drawerFormProps,
  }) => {
  
    const { formProps, drawerProps, saveButtonProps } = drawerFormProps;
    
    return (
      <Drawer {...drawerProps}>
        <Create saveButtonProps={saveButtonProps}>
          <ServiceForm formProps={formProps} />
        </Create>
      </Drawer>
    );
  };