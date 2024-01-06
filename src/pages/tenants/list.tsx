import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useList,
  useGetIdentity,
  useGo,
} from "@refinedev/core";
import { List, EditButton, ShowButton } from "@refinedev/antd";
import { Card, Flex, Avatar, Typography } from "antd";
import { Tables } from "../../types/supabase";
import { IIdentity } from "../../types/interfaces";
import { supabaseClient } from "../../utility";

export const TenantList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { data: identity, refetch } = useGetIdentity<IIdentity>();
  const go = useGo();
  const { data } = useList<Tables<"tenants">>({
    meta: {
      select: "*, accounts!inner(*)",
    },
    filters: [
      {
        field: "accounts.user_id",
        operator: "eq",
        value: identity?.id,
      },
    ],
  });

  const selectTenantHander = async (tenant_id: string) => {
    const { error } = await supabaseClient.auth.updateUser({
      data: { tenant_id }
    })
    if (error) {
      return console.log(error);
    }
    refetch();
    go({
      to: `/${tenant_id}/`,
    });
    console.log(error);
  }
  console.log(identity);

  return (
    <List>
      <Flex wrap="wrap" gap={20}>
        {data?.data?.map((record) => (
          <Card
            style={{ maxWidth: 550 }}
            hoverable
            bordered={false}
            key={record.id}
            actions={[
              <ShowButton
                type="text"
                size="small"
                key={record.id}
                recordItemId={record.id}
              >
                Seleccionar
              </ShowButton>,
              <EditButton
                type="text"
                size="small"
                key={record.id}
                recordItemId={record.id}
              />,
            ]}
          >
            <Flex justify="space-between">
              <div>
                <Avatar size={150}>
                  {record.name[0].toLocaleUpperCase()}
                </Avatar>
              </div>
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{ padding: 32 }}
              >
                <Typography.Title level={3}>
                  {record.name}
                </Typography.Title>
                <ShowButton
                  type="primary"
                  onClick={() => selectTenantHander(record.id)}
                >
                  Seleccionar
                </ShowButton>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </List>
  );
};
