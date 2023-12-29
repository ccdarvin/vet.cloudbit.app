import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  BooleanField,
  useDrawerForm,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { StaffCreate } from "./create";
import { StaffEdit } from "./edit";

export const StaffList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  
  const { tableProps } = useTable({
    syncWithLocation: true,
    filters:{
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant
        },
      ],
    }
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"staff">>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"staff">>({
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
          dataIndex="first_name"
          title={translate("staff.fields.first_name")}
        />
        <Table.Column
          dataIndex="last_name"
          title={translate("staff.fields.last_name")}
        />
        <Table.Column
          dataIndex=" email"
          title={translate("staff.fields. email")}
        />
        <Table.Column
          dataIndex="phone"
          title={translate("staff.fields.phone")}
        />
        <Table.Column
          dataIndex={["is_doctor"]}
          title={translate("staff.fields.is_doctor")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton 
                hideText size="small" 
                recordItemId={record.id}
                onClick={() => drawerFormPropsEdit.show(record.id)} 
              />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <StaffCreate drawerFormProps={drawerFormPropsCreate} />
      <StaffEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
