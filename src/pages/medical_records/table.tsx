import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
} from "@refinedev/core";
import { useTable, EditButton, ShowButton, useDrawerForm } from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { MedicalRecordsEdit } from "./edit";

export const MedicalRecordsTable: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ patient: string; tenant: string }>();
  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      select: "*, patient:patient_id(*), doctor:doctor_id(*)",
    },
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
        {
          field: "patient_id",
          operator: "eq",
          value: params?.patient,
        },
      ],
    },
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'medical_records'>>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["patient", "name"]}
          title={translate("medical_records.fields.patient")}
        />
        <Table.Column
          dataIndex={["doctor", "name"]}
          title={translate("medical_records.fields.doctor")}
        />
        <Table.Column
          dataIndex="symptoms"
          title={translate("medical_records.fields.symptoms")}
        />
        <Table.Column
          dataIndex="diagnosis"
          title={translate("medical_records.fields.diagnosis")}
        />
        <Table.Column
          dataIndex="treatment"
          title={translate("medical_records.fields.treatment")}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} 
                onClick={() => drawerFormPropsEdit.show(record.id)}
              />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <MedicalRecordsEdit drawerFormProps={drawerFormPropsEdit} />
    </>
  );
};
