import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
} from "@refinedev/core";
import { useTable, List, EditButton, ShowButton, useDrawerForm } from "@refinedev/antd";
import { Table, Space } from "antd";
import DateField from "../../components/fields/DateField";
import { Tables } from "../../types/supabase";
import { PatientCreate } from "./create";
import { PatientEdit } from "./edit";
import AgeField from "../../components/fields/AgeField";

export const PatientsList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      select: "*, breed_id, species:species_id(*), breed:breed_id(*)",
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
  })

  const drawerFormPropsCreate = useDrawerForm<Tables<'patients'>>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'patients'>>({
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
          title={translate("patients.fields.name")}
        />

        <Table.Column
          dataIndex={["birthday"]}
          title={translate("patients.fields.age")}
          render={(value: string) => <AgeField value={value} />}
        />
        <Table.Column
          dataIndex="sex"
          title={translate("patients.fields.sex")}
        />
        <Table.Column
          dataIndex={["species", "name"]}
          title={translate("patients.fields.species")}
        />
        <Table.Column
          dataIndex={["breed", "name"]}
          title={translate("patients.fields.breed")}
        />
        <Table.Column
          title={translate("table.actions")}
          fixed="right"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} onClick={() => drawerFormPropsEdit.show(record.id)} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <PatientCreate drawerFormProps={drawerFormPropsCreate} />
      <PatientEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
