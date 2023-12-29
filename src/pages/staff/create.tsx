
import { IResourceComponentsProps } from "@refinedev/core";
import { UseDrawerFormReturnType } from "@refinedev/antd";

import { Tables } from "../../types/supabase";
import CreateDrawer from "../../components/crud/CreateDrawer";
import { StaffForm } from "./form";

export const StaffCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'staff'>> }>  = ({
  drawerFormProps,
}) => {

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
      <CreateDrawer drawerProps={drawerProps} saveButtonProps={saveButtonProps}>
        <StaffForm formProps={formProps} />
      </CreateDrawer>
  );
};

