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
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { SpeciesCreateOrEdit } from "./CreateOrEdit";
import { BreedList } from "../breeds";

export const SpeciesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { params } = useParsed<{ tenant: string }>();

  const { tableProps } = useTable({
    syncWithLocation: true,
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant as string,
        },
      ],
    },
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
        <Table 
          {...tableProps} 
          rowKey="id"
          expandable={{
            expandedRowRender: record => <BreedList species_id={record.id as string} />,
          }}
        >
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
