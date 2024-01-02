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
  useDrawerForm,
  BooleanField,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { PaymentsCreate } from "./create";

export const PaymentsList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const { tableProps, sorters } = useTable({
    syncWithLocation: true,
    meta: {
      select:
        "*, order:order_id(*), cash_register:cash_register_id(*), payment_type:payment_type_id(*)",
    },
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"payments">>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"payments">>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <List
      headerButtons={[]}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["order", "number"]}
          title={translate("orders.fields.number")}
          sorter
          defaultSortOrder={getDefaultSortOrder("order.number", sorters)}
          render={(value, record) => {
            if (!value) return null;
            return <span>#{value}</span>;
          }}
        />
        <Table.Column
          dataIndex={["cash_register", "number"]}
          title={translate("cash_registers.fields.number")}
          sorter
          defaultSortOrder={getDefaultSortOrder(
            "cash_register.number",
            sorters
          )}
          render={(value, record) => {
            return <span>#{value}</span>;
          }}
        />
        <Table.Column
          dataIndex={["payment_type", "name"]}
          title={translate("payments.fields.payment_type")}
          sorter
          defaultSortOrder={getDefaultSortOrder("payment_type", sorters)}
        />

        <Table.Column
          dataIndex="amount"
          title={translate("payments.fields.amount")}
          sorter
          defaultSortOrder={getDefaultSortOrder("amount", sorters)}
        />
      </Table>
    </List>
  );
};
