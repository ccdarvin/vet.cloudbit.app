import { Edit, UseDrawerFormReturnType } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core"
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { StaffForm } from "./form";

export const StaffEdit: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'staff'>> }> = ({
    drawerFormProps,
  }) => {
  
    const { formProps, drawerProps, saveButtonProps } = drawerFormProps;
    
    return (
      <Drawer {...drawerProps}>
        <Edit saveButtonProps={saveButtonProps}>
          <StaffForm formProps={formProps} />
        </Edit>
      </Drawer>
    );
  };
  