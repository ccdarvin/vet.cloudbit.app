import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  useDrawerForm,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { SpeciesCreateOrEdit } from "./CreateOrEdit";

export const SpeciesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<'species'>>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'species'>>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <List 
        createButtonProps={{
          onClick: () => drawerFormPropsCreate.show()
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="name"
            title={translate("species.fields.name")}
          />
          <Table.Column
            title={translate("table.actions")}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} onClick={() => drawerFormPropsEdit.show(record.id)} />
              </Space>
            )}
          />
        </Table>
      </List>
      <SpeciesCreateOrEdit  drawerFormProps={drawerFormPropsCreate}/>
      <SpeciesCreateOrEdit  drawerFormProps={drawerFormPropsEdit}/>
    </>
  );
};
