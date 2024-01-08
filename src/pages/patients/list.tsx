import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useParsed,
  CrudFilters,
} from "@refinedev/core";
import { useTable, List, EditButton, ShowButton, useDrawerForm, getDefaultSortOrder, FilterDropdown } from "@refinedev/antd";
import { Table, Space } from "antd";
import { Tables } from "../../types/supabase";
import { PatientCreate } from "./create";
import { PatientEdit } from "./edit";
import AgeField from "../../components/fields/AgeField";
import CustomerSelect from "../../components/controls/CustomerSelect";
import SpeciesSelect from "../../components/controls/SpeciesSelect";
import ShowField from "../../components/fields/ShowField";

export const PatientsList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string, customer:string }>();
  const filterByCustomer: CrudFilters = params?.customer ? [{
    field: "customer_id",
    operator: "eq",
    value: params?.customer,
  }] : []
  const { tableProps, sorters } = useTable({
    syncWithLocation: true,
    meta: {
      select: "*, breed_id, species:species_id(*), breed:breed_id(*), customer:customer_id(*)",
    },
    filters: {
      permanent: [
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
        ...filterByCustomer
      ],
    },
  })

  const drawerFormPropsCreate = useDrawerForm<Tables<'patients'>>({
    action: "create",
    syncWithLocation: true,
    submitOnEnter: true,
  });

  const drawerFormPropsEdit = useDrawerForm<Tables<'patients'>>({
    action: "edit",
    syncWithLocation: true,
    submitOnEnter: true,
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
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          title={translate("patients.fields.name")}
          render={(value: string, record: Tables<"patients">) => (
            <ShowField resource="patients" recordItemId={record.id}>
              {value}
            </ShowField>
          )}
        />
        {!params?.customer && <Table.Column
          dataIndex={["customer_id"]}
          title={translate("patients.fields.customer")}
          render={(value, record: BaseRecord) => (record?.customer?.name)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <CustomerSelect />
            </FilterDropdown>
          )}
        />}
        <Table.Column
          dataIndex={["species_id"]}
          title={translate("patients.fields.species")}
          render={(value, record: BaseRecord) => (record?.species?.name)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <SpeciesSelect />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["breed_id"]}
          title={translate("patients.fields.breed")}
          render={(value, record: BaseRecord) => (record?.breed?.name)}
        />
        <Table.Column
          dataIndex={["birthday"]}
          title={translate("patients.fields.age")}
          render={(value: string) => <AgeField value={value} />}
        />
        <Table.Column
          dataIndex={["sex"]}
          title={translate("patients.fields.sex")}
          sorter
          defaultSortOrder={getDefaultSortOrder("sex", sorters)}
          render={(value: string) => <span>
            {value? translate(`patients.enums.${value}`): "-"}
          </span>
          }
        />
        <Table.Column
          title={translate("table.actions")}
          fixed="right"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" type="text" recordItemId={record.id} onClick={() => drawerFormPropsEdit.show(record.id)} />
              <ShowButton hideText size="small" type="text" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      <PatientCreate drawerFormProps={drawerFormPropsCreate} />
      <PatientEdit drawerFormProps={drawerFormPropsEdit} />
    </List>
  );
};
