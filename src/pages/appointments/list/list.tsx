import { useDrawerForm, useSimpleList } from "@refinedev/antd";
import {
  IResourceComponentsProps,
  useParsed,
  useTranslate,
} from "@refinedev/core";
import { Badge, Flex, List, Typography } from "antd";
import { Tables } from "../../../types/supabase";
import { AppointmentsEdit } from "../edit";
import DateField from "../../../components/fields/DateField";
import { appointmentStatusOptions } from "../../../constants";

export const AppointmentsSimpleList: React.FC<
  IResourceComponentsProps
> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string; patient: string }>();

  const { listProps } = useSimpleList({
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

  const drawerFormPropsEdit = useDrawerForm<Tables<"appointments">>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <List
      bordered
        {...listProps}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                key="edit"
                onClick={() => {
                  drawerFormPropsEdit.show(item.id);
                }}
              >
                {translate("actions.edit")}
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item.doctor?.name}
              description={<Flex vertical>
                <DateField type="secondary" value={item.date} />
                <div>
                  <Typography.Text>
                    {item.patient?.name}
                  </Typography.Text>
                </div>
              </Flex>}
            />
            <Badge
              text={translate(`appointments.enums.status.${item.status}`)}
              color={
                appointmentStatusOptions.find(
                  (status) => status.value === item.status
                )?.color
              }
            />
          </List.Item>
        )}
      />
      <AppointmentsEdit drawerFormProps={drawerFormPropsEdit} />
    </>
  );
};
