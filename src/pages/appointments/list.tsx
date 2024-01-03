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
  getDefaultSortOrder,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { AppointmentsCreate } from "./create";
import BadgeField from "../../components/fields/BadgeField";
import { AppointmentsEdit } from "./edit";
import { appointmentStatusOptions } from "../../constants";
import AppointmentSelect from "../../components/controls/AppointmentSelect";
import AppointmentStatusSegmented from "../../components/controls/AppointmentStatus";
import AppointmentStatusSelect from "../../components/controls/AppointmentStatusSelect";

export const AppointmentsList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string; patient: string }>();
  const { resource } = useResource();

  const { tableProps, sorters } = useTable({
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
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
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
          dataIndex={["doctor", "first_name"]}
          title={translate("appointments.fields.doctor")}
          sorter
          render={(value, record: any) => (
            <>
              {record?.doctor?.first_name} {record?.doctor?.last_name}
            </>
          )}
        />
        <Table.Column
          dataIndex={["date"]}
          sorter
          defaultSortOrder={getDefaultSortOrder("date", sorters)}
          title={translate("appointments.fields.date")}
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="reason"
          title={translate("appointments.fields.reason")}
          sorter
          defaultSortOrder={getDefaultSortOrder("reason", sorters)}
        />
        <Table.Column
          dataIndex="status"
          title={translate("appointments.fields.status")}
          sorter
          defaultSortOrder={getDefaultSortOrder("status", sorters)}
          filterDropdown={(props) => {
            return <FilterDropdown {...props}>
              <AppointmentStatusSelect />
             </FilterDropdown> 
          }}
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
          fixed="right"
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
