import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  useDrawerForm,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { VaccioneCreate } from "./create";
import { VaccioneEdit } from "./edit";
import DateField from "../../components/fields/DateField";

export const VaccinesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string; patient: string }>();
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      permanent: [
        {
          field: "date",
          order: "desc",
        },
      ],
    },
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        }, {
          field: "patient_id",
          operator: "eq",
          value: params?.patient,
        }
      ],
    },
  });

  const drawerFormPropsCreate = useDrawerForm<Tables<"patients">>({
    action: "create",
    syncWithLocation: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<"patients">>({
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
          title={translate("vaccines.fields.name")}
        />
        <Table.Column
          dataIndex={"date"}
          title={translate("vaccines.fields.date")}
          render={(_, record: BaseRecord) => <DateField value={record?.date} />}
        />
        <Table.Column
          dataIndex={"has"}
          title={translate("vaccines.fields.has")}
          render={(_, record: BaseRecord) => translate('bool.' + record?.is_done)}
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
            </Space>
          )}
        />
      </Table>
      <VaccioneCreate drawerFormProps={drawerFormPropsCreate} />
      <VaccioneEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
