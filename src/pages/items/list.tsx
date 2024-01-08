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
import { ItemsEdit } from "./edit";
import { ItemsCreate } from "./create";

export const ItemList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const { tableProps, sorters } = useTable({
    syncWithLocation: true,
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

  const drawerFormPropsCreate = useDrawerForm<Tables<"items">>({
    action: "create",
    syncWithLocation: true,
    submitOnEnter: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"items">>({
    action: "edit",
    syncWithLocation: true,
    submitOnEnter: true,
  });

  return (
    <List
      createButtonProps={{
        onClick: () => drawerFormPropsCreate.show(),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="sku"
          title={translate("items.fields.sku")}
          sorter
          defaultSortOrder={getDefaultSortOrder("sku", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title={translate("items.fields.name")}
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
        />
        <Table.Column
          dataIndex="is_service"
          title={translate("items.fields.is_service")}
          sorter
          defaultSortOrder={getDefaultSortOrder("is_service", sorters)}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex="price"
          title={translate("items.fields.price")}
          sorter
          defaultSortOrder={getDefaultSortOrder("price", sorters)}
        />
        <Table.Column
          dataIndex="stock"
          title={translate("items.fields.stock")}
          sorter
          defaultSortOrder={getDefaultSortOrder("stock", sorters)}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          fixed="right"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={() => drawerFormPropsEdit.show(record.id)}
              />
            </Space>
          )}
        />
      </Table>
      <ItemsEdit drawerFormProps={drawerFormPropsEdit} />
      <ItemsCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
