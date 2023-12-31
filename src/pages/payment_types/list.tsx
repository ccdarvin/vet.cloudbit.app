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
import { PaymentTypesCreate } from "./create";
import { PaymentTypesEdit } from "./edit";
import BadgeField from "../../components/fields/BadgeField";
import { paymentMethodOptions } from "../../constants";

export const PaymentTypesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable<Tables<"payment_types">>({
    syncWithLocation: true,
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"payment_types">>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"payment_types">>({
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
          title={translate("payment_types.fields.name")}
        />
        <Table.Column
          dataIndex="payment_method"
          title={translate("payment_types.fields.payment_method")}
          render={(value) => {
            return (
              <BadgeField
                value={translate(
                  `payment_types.enums.payment_method.${value}`
                )}
                color={
                  paymentMethodOptions.find((item) => item.value === value)
                    ?.color
                }
              />
            );
          }}
        />
        <Table.Column
          dataIndex="description"
          title={translate("payment_types.fields.description")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: Tables<"payment_types">) => (
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
      <PaymentTypesCreate drawerFormProps={drawerFormPropsCreate} />
      <PaymentTypesEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
