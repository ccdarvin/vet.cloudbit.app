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
  EmailField,
  useDrawerForm,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { CustomerEdit } from "./edit";
import { CustomerCreate } from "./create";

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  const { tableProps } = useTable({
    syncWithLocation: true,
    filters: {
      initial: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
      ],
    }
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<'customers'>>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'customers'>>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <List

    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title={translate("customers.fields.name")}
        />
        <Table.Column
          dataIndex={["email"]}
          title={translate("customers.fields.email")}
          render={(value: string) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="phone"
          title={translate("customers.fields.phone")}
        />

        <Table.Column
          dataIndex="doc_number"
          title={translate("customers.fields.doc_number")}
        />
        <Table.Column
          dataIndex="address"
          title={translate("customers.fields.address")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton 
                hideText size="small" 
                recordItemId={record.id} 
                onClick={() => drawerFormPropsEdit.show(record.id)} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <CustomerEdit drawerFormProps={drawerFormPropsEdit} />
      <CustomerCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
