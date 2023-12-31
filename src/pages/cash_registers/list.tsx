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
import { CashRegisterCreate } from "./create";
import DateField from "../../components/fields/DateField";

export const CashRegistersList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable<Tables<"cash_registers">>({
    syncWithLocation: true,
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"cash_registers">>({
    action: "create",
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
          dataIndex="number"
          title={translate("cash_registers.fields.number")}
          render={(value) => <strong>#{value}</strong>}
        />
        <Table.Column
          dataIndex="open_at"
          title={translate("cash_registers.fields.open_at")}
          render={(value) => <DateField value={value} format="L LT" />}
        />
        <Table.Column
          dataIndex="close_at"
          title={translate("cash_registers.fields.close_at")}
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="is_balanced"
          title={translate("cash_registers.fields.is_balanced")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          fixed="right"
          render={(_, record: Tables<"treatment_types">) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <CashRegisterCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
