import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  EditButton,
  Show, useDrawerForm,
} from "@refinedev/antd";
import { Avatar, Descriptions, Layout, Menu, Space, Typography } from "antd";
import SideBar from "../../components/layout/SideBar";
import { Tables } from "../../types/supabase";
import AgeField from "../../components/fields/AgeField";
import { PatientEdit } from "./edit";

const { Title, Text } = Typography;

export const PacientShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow({
    meta: {
      select: "*, species:species_id(*), breed:breed_id(*), customer:customer_id(*)",
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const drawerFormPropsEdit = useDrawerForm<Tables<'patients'>>({
    action: "edit",
    redirect: "show",
    meta: {
      select:"*"
    },
    syncWithLocation: true,
  });

  return (
    <Layout style={{
      gap: 30,
    }}>
      <SideBar 
        header={<Space>
          <Avatar size={64}>
            {record?.name?.toUpperCase()[0]}
          </Avatar>
          <Space direction="vertical">
            <Text strong>{record?.name}</Text>
            <Text type="secondary">{record?.species?.name}</Text>
          </Space>
        </Space>}
        menuItems={<>
          <Menu.Item key="1">Información</Menu.Item>
          <Menu.Item key="2">vacunas</Menu.Item>
        </>}
      />
      <Layout.Content>
        <Show isLoading={isLoading}>
          <Descriptions title="Información" bordered 
            extra={<EditButton recordItemId={record?.id} onClick={() => drawerFormPropsEdit.show(record?.id)} />}
          >
            <Descriptions.Item label={translate("patients.fields.name")}>
              {record?.name}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.customer")}>
              {record?.customer?.name || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.species")}>
              {record?.species?.name || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.breed")}>
              {record?.breed?.name || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.age")}>
              <AgeField value={record?.birthday} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.sex")}>
              {record?.sex ? translate(`patients.enums.${record.sex}`): '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.color")}>
              {record?.color || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.weight")}>
              {record?.weight || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.microchip")}>
              {record?.microchip || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.weight")}>
              {record?.weight || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.last_heat")}>
              {record?.last_heat || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.aggressiveness")}>
              {record?.aggressiveness ? translate(`patients.enums.${record.aggressiveness}`): '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.meal")}>
              {record?.meal ? translate(`patients.enums.${record.meal}`): '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.observations")}>
              {record?.observations || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.is_castrated")}>
              {translate(`bool.${record?.is_castrated}`)}
            </Descriptions.Item>
            <Descriptions.Item label={translate("patients.fields.is_dead")}>
              {translate(`bool.${record?.is_dead}`)}
            </Descriptions.Item>
          </Descriptions> 
        </Show>
      </Layout.Content>
      <PatientEdit drawerFormProps={drawerFormPropsEdit} />
    </Layout>
  );
};
