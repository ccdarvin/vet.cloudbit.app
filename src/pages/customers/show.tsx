import { EditButton, Show, useDrawerForm } from "@refinedev/antd";
import {
  IResourceComponentsProps,
  useParsed,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Descriptions } from "antd";
import { Tables } from "../../types/supabase";
import { CustomerEdit } from "./edit";

export const CustomersShow: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed<{ customer: string }>();

  const { queryResult } = useShow({
    id: params?.customer,
    meta: {
      select: "*",
    },
  });
  const record = queryResult.data?.data;
  const translate = useTranslate();
  const drawerFormPropsEdit = useDrawerForm<Tables<"customers">>({
    resource: "customers",
    id: params?.customer,
    action: "edit",
    redirect: "show",
    meta: {
      select: "*",
    },
    syncWithLocation: true,
  });

  return (
    <Show isLoading={queryResult.isLoading}>
      <Descriptions
        title="Información"
        layout="vertical"
        extra={
          <EditButton
            recordItemId={record?.id}
            onClick={() => drawerFormPropsEdit.show(record?.id)}
          />
        }
      >
        <Descriptions.Item label={translate("customers.fields.name")}>
          {record?.name}
        </Descriptions.Item>
        <Descriptions.Item label={translate("customers.fields.doc_number")}>
          {record?.doc_number}
        </Descriptions.Item>
        <Descriptions.Item label={translate("customers.fields.email")}>
          {record?.email}
        </Descriptions.Item>
        <Descriptions.Item label={translate("customers.fields.phone")}>
          {record?.phone}
        </Descriptions.Item>
        <Descriptions.Item label={translate("customers.fields.address")}>
          {record?.address}
        </Descriptions.Item>
        <Descriptions.Item label={translate("customers.fields.address_ref")}>
          {record?.address_ref}
        </Descriptions.Item>
      </Descriptions>
      <CustomerEdit drawerFormProps={drawerFormPropsEdit} />
    </Show>
  );
};
