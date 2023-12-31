import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, UseDrawerFormReturnType } from "@refinedev/antd";
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { SpeciesForm } from "./form";
import EditDrawer from "../../components/crud/EditDrawer";

export const SpeciesEdit: React.FC<
  IResourceComponentsProps & {
    drawerFormProps: UseDrawerFormReturnType<Tables<"species">>;
  }
> = ({ drawerFormProps }) => {
  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <EditDrawer
      resource="species"
      drawerProps={drawerProps}
      saveButtonProps={saveButtonProps}
    >
      <SpeciesForm formProps={formProps} />
    </EditDrawer>
  );
};
