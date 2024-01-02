import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
  useResource,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  useDrawerForm,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { AppointmentsCreate } from "./create";
import BadgeField from "../../components/fields/BadgeField";
import { AppointmentsEdit } from "./edit";
import { appointmentStatusOptions } from "../../constants";

export const AppointmentsList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string; patient: string }>();
  const { resource } = useResource();

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
        {
          field: "is_visit",
          operator: "eq",
          value: resource?.identifier === "visits",
        },
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
          dataIndex={["patient", "name"]}
          title={translate("appointments.fields.patient")}
        />
        <Table.Column
          dataIndex={["doctor"]}
          title={translate("appointments.fields.doctor")}
          render={(value) => (
            <>
              {value?.first_name} {value?.last_name}
            </>
          )}
        />
        <Table.Column
          dataIndex={["date"]}
          title={translate("appointments.fields.date")}
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="reason"
          title={translate("appointments.fields.reason")}
        />
        <Table.Column
          dataIndex="status"
          title={translate("appointments.fields.status")}
          render={(value) => (
            <BadgeField
              value={value}
              color={
                appointmentStatusOptions.find((item) => item.value === value)
                  ?.color
              }
            />
          )}
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
      <AppointmentsCreate drawerFormProps={drawerFormPropsCreate} />
      <AppointmentsEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
