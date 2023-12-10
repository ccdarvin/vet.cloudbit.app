import React from "react";
import {
  useOne,
  IResourceComponentsProps,
  useTranslate,
  useParsed
} from "@refinedev/core";
import { useDrawerForm } from "@refinedev/antd";
import { Avatar, Layout, Space, Typography } from "antd";
import SideBar from "../../components/layout/SideBar";
import { Tables } from "../../types/supabase";

const { Text } = Typography;

export const PatientLayout: React.FC<IResourceComponentsProps & {
  children: React.ReactNode;
}> = ({
  children,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ patient: string }>();
  const { data, isLoading, isError } = useOne({
    resource: "patients",
    id: params?.patient,
    meta: {
      select:
        "*, species:species_id(*), breed:breed_id(*), customer:customer_id(*)",
    },
  });

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
        parentName="patients"
        header={
          <Space>
            <Avatar size={64}>{record?.name?.toUpperCase()[0]}</Avatar>
            <Space direction="vertical">
              <Text strong>{record?.name}</Text>
              <Text type="secondary">{record?.species?.name}</Text>
            </Space>
          </Space>
        }
      />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};
