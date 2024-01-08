import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
  HttpError,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  EmailField,
  useDrawerForm,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space, Input, Form } from "antd";
import { Tables } from "../../types/supabase";
import { CustomerEdit } from "./edit";
import { CustomerCreate } from "./create";

interface ISearch {
  query: string;
}

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  const { tableProps, sorters, searchFormProps } = useTable<
    Tables<"customers">,
    HttpError,
    ISearch
  >({
    syncWithLocation: true,
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values?.query,
        },
      ];
    },
    filters: {
      initial: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
      ],
    },
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"customers">>({
    action: "create",
    syncWithLocation: true,
    submitOnEnter: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"customers">>({
    action: "edit",
    syncWithLocation: true,
    submitOnEnter: true,
  });

  return (
    <List
      createButtonProps={{
        onClick: () => drawerFormPropsCreate.show(),
      }}
      headerButtons={({ defaultButtons }) => (
        <Space>
          <Form {...searchFormProps} layout="inline">
            <Form.Item name="query">
              <Input.Search onSearch={searchFormProps.form?.submit}/>
            </Form.Item>
          </Form>
          {defaultButtons}
        </Space>
      )}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          title={translate("customers.fields.name")}
        />
        <Table.Column
          dataIndex={["email"]}
          sorter
          defaultSortOrder={getDefaultSortOrder("email", sorters)}
          title={translate("customers.fields.email")}
          render={(value: string) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="phone"
          sorter
          defaultSortOrder={getDefaultSortOrder("phone", sorters)}
          title={translate("customers.fields.phone")}
        />

        <Table.Column
          dataIndex="doc_number"
          sorter
          defaultSortOrder={getDefaultSortOrder("doc_number", sorters)}
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
      <CustomerEdit drawerFormProps={drawerFormPropsEdit} />
      <CustomerCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
