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
    useDrawerForm
  } from "@refinedev/antd";
  import { Table, Space } from "antd";
  import { Tables } from "../../types/supabase";
import { ServicesEdit } from "./edit";
  
  export const ServiceList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { params } = useParsed<{ tenant: string }>();
  
    const { tableProps } = useTable({
      syncWithLocation: true,
      filters: {
        permanent: [
          {
            field: "tenant_id",
            operator: "eq",
            value: params?.tenant,
          }, {
            field: "is_service",
            operator: "eq",
            value: true,
          }
        ],
      }
    });
  
    const drawerFormPropsCreate = useDrawerForm<Tables<'items'>>({
      action: "create",
      syncWithLocation: true,
    });
  
    const drawerFormPropsEdit = useDrawerForm<Tables<'items'>>({
      action: "edit",
      syncWithLocation: true,
    });
  
    return (
      <List
        createButtonProps={{
          onClick: () => drawerFormPropsCreate.show()
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title={translate("items.fields.name")} />
          <Table.Column
            dataIndex="price"
            title={translate("items.fields.price")}
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
                <ShowButton 
                  hideText 
                  size="small" 
                  recordItemId={record.id}
                />
              </Space>
            )}
          />
        </Table>
        <ServicesEdit drawerFormProps={drawerFormPropsEdit} />
        <ServicesEdit drawerFormProps={drawerFormPropsCreate} />
      </List>
    );
  };
  