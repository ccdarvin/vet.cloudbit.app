import React from "react";
import {
  useOne,
  IResourceComponentsProps,
  useParsed
} from "@refinedev/core";
import { Avatar, Layout, Space, Typography } from "antd";
import SideBar from "../../components/layout/SideBar";

const { Text } = Typography;

export const PatientLayout: React.FC<IResourceComponentsProps & {
  children: React.ReactNode;
}> = ({
  children,
}) => {
  const { params } = useParsed<{ patient: string }>();
  const { data } = useOne({
    resource: "patients",
    id: params?.patient,
    meta: {
      select:
        "*, species:species_id(*), breed:breed_id(*), customer:customer_id(*)",
    },
  });

  const record = data?.data;

  return (
    <Layout
      style={{
        gap: 30,
      }}
    >
      <SideBar
        resourceMenuList={["appointmentsByPatient", 'medical_records', 'notes']}
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
