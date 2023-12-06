import { IResourceComponentsProps, useTranslate, useParsed } from "@refinedev/core";
import { Create, UseDrawerFormReturnType } from "@refinedev/antd";
import { Drawer } from "antd";
import { Tables } from "../../types/supabase";
import { SpeciesForm } from "./form";

export const SpeciesCreate: React.FC<IResourceComponentsProps & 
{ drawerFormProps: UseDrawerFormReturnType<Tables<'species'>> }> = ({
  drawerFormProps,
}) => {
  const translate = useTranslate();

  const { formProps, drawerProps, saveButtonProps } = drawerFormProps;

  return (
    <Drawer {...drawerProps} title={translate("species.create.title")}>
      <Create saveButtonProps={saveButtonProps}>
        <SpeciesForm formProps={formProps} />
      </Create>
    </Drawer>
  );
};
