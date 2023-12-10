import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { useDrawerForm } from "@refinedev/antd";
import { Avatar, Layout, Menu, Space, Typography } from "antd";
import SideBar from "../../components/layout/SideBar";
import { Tables } from "../../types/supabase";
import { PatientEdit } from "./edit";

const { Title, Text } = Typography;

export const PacientLayout: React.FC<IResourceComponentsProps & {
  children: React.ReactNode;
}> = ({
  children,
}) => {
  const translate = useTranslate();
  const { queryResult } = useShow({
    meta: {
      select:
        "*, species:species_id(*), breed:breed_id(*), customer:customer_id(*)",
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const drawerFormPropsEdit = useDrawerForm<Tables<"patients">>({
    action: "edit",
    redirect: "show",
    meta: {
      select: "*",
    },
    syncWithLocation: true,
  });

  return (
    <Layout
      style={{
        gap: 30,
      }}
    >
      <SideBar
        header={
          <Space>
            <Avatar size={64}>{record?.name?.toUpperCase()[0]}</Avatar>
            <Space direction="vertical">
              <Text strong>{record?.name}</Text>
              <Text type="secondary">{record?.species?.name}</Text>
            </Space>
          </Space>
        }
        menuItems={
          <>
            <Menu.Item key="1">Información</Menu.Item>
            <Menu.Item key="2">vacunas</Menu.Item>
          </>
        }
      />
      <Layout.Content>{children}</Layout.Content>
      <PatientEdit drawerFormProps={drawerFormPropsEdit} />
    </Layout>
  );
};
