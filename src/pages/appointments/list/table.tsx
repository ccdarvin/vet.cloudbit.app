import { EditButton, FilterDropdown, ShowButton, getDefaultSortOrder, useDrawerForm, useTable } from "@refinedev/antd";
import { IResourceComponentsProps, useParsed, useTranslate } from "@refinedev/core";
import { Space, Table } from "antd";
import { Tables } from "../../../types/supabase";
import DateField from "../../../components/fields/DateField";
import AppointmentStatusSelect from "../../../components/controls/AppointmentStatusSelect";
import BadgeField from "../../../components/fields/BadgeField";
import { appointmentStatusOptions } from "../../../constants";
import { AppointmentsEdit } from "../edit";


interface IAppointment extends Tables<"appointments"> {
  doctor: Tables<"staff">;
  patient: Tables<"patients">;
}


export const AppointmentsTable: React.FC<IResourceComponentsProps> = () => {
  
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string; patient: string }>();

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

  const drawerFormPropsEdit = useDrawerForm<Tables<"patients">>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["patient", "name"]}
          title={translate("appointments.fields.patient")}
        />
        <Table.Column
          dataIndex={["doctor", "first_name"]}
          title={translate("appointments.fields.doctor")}
          sorter
          render={(value, record: IAppointment) => (
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
            return (
              <FilterDropdown {...props}>
                <AppointmentStatusSelect />
              </FilterDropdown>
            );
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
          render={(_, record: IAppointment) => (
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
      <AppointmentsEdit drawerFormProps={drawerFormPropsEdit} />
    </>
  );
};
