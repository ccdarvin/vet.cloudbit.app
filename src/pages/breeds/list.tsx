import {
  BaseRecord,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { useTable, List, useDrawerForm, EditButton } from "@refinedev/antd";
import { Space, Table } from "antd";
import { Tables } from "../../types/supabase";
import { BreedsCreateOrEdit } from "./CreateOrEdit";

export const BreedList: React.FC<
  IResourceComponentsProps & { species_id: string }
> = ({ species_id }) => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    resource: "breeds",
    filters: {
      permanent: [
        {
          field: "species_id",
          operator: "eq",
          value: species_id,
        },
      ],
    },
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<'breeds'>>({
    action: "create",
    syncWithLocation: true,
    resource: "breeds",
    redirect: false,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'breeds'>>({
    action: "edit",
    syncWithLocation: true,
    resource: "breeds",
    redirect: false,
  });

  return (
    <List
      createButtonProps={{
        onClick: () => {
          drawerFormPropsCreate.show();
        }
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title={translate("breeds.fields.name")}
        />
        <Table.Column
          dataIndex="description"
          title={translate("breeds.fields.description")}
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
      <BreedsCreateOrEdit drawerFormProps={drawerFormPropsCreate} />
      <BreedsCreateOrEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
