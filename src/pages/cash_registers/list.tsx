import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  useDrawerForm,
} from "@refinedev/antd";
import { Space, Table } from "antd";
import { Tables } from "../../types/supabase";
import { TreatmentTypesCreate } from "./create";
import { TreatmentTypesEdit } from "./edit";

export const TreatmentTypesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable<Tables<"treatment_types">>({
    syncWithLocation: true,
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"treatment_types">>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"treatment_types">>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <List
      createButtonProps={{
        onClick: () => drawerFormPropsCreate.show(),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title={translate("treatment_types.fields.name")}
        />
        <Table.Column
          dataIndex="description"
          title={translate("treatment_types.fields.description")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: Tables<"treatment_types">) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={() => drawerFormPropsEdit.show(record.id)}
              />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <TreatmentTypesCreate drawerFormProps={drawerFormPropsCreate} />
      <TreatmentTypesEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
