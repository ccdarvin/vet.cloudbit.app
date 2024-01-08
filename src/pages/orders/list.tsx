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
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  console.log(params);
  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      select: "*, customer:customer_id(*)",
    },
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
      ]
    }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="number"
          title={translate("orders.fields.number")}
          render={(value: string) => <span>#{value}</span> }
        />
        <Table.Column
          dataIndex={["customer", "name"]}
          title={translate("orders.fields.customer")}
        />
        <Table.Column
          dataIndex="total"
          title={translate("orders.fields.total")}
        />
        <Table.Column
          dataIndex="total_paid"
          title={translate("orders.fields.total_paid")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
