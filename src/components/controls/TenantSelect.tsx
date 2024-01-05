import { useSelect } from "@refinedev/antd";
import {
  useGetIdentity,
  useGetToPath,
  useGo,
  useParsed,
} from "@refinedev/core";
import { Select } from "antd";
import { Tables } from "../../types/supabase";
import { useEffect } from "react";

type IIdentity = {
  id: number;
  fullName: string;
  user_metadata: {
    tenant_id: string;
  };
};

export default function TenantSelect() {
  const getToPath = useGetToPath();
  const go = useGo();
  const { data: identity } = useGetIdentity<IIdentity>();
  const { resource, action, params } = useParsed<{
    tenant: string;
  }>();

  const { selectProps: storeSelectProps, queryResult } = useSelect<Tables<"tenants">>({
    meta: {
      select: '*, accounts!inner(*)',
    },
    filters: [
      {
        field: "accounts.user_id",
        operator: "eq",
        value: identity?.id,
      },
    ],
    resource: "tenants",
    optionLabel: "name",
    optionValue: "id",
  });
  useEffect(() => {
    if (queryResult.isFetched) {
      if (queryResult?.data?.total === 0) {
        go({
          to: '/tenants/create',
        });
      }
    }
  }, [queryResult.data, queryResult.isFetched]);

  return (
    <>
      {(queryResult?.data?.total ?? 0) > 0 && <Select
        value={params?.tenant}
        style={{ width: 120 }}
        onChange={(tenant) =>
          go({
            to: getToPath({
              resource,
              action: action || "list",
              meta: {
                tenant,
              },
            }),
          })
        }
        onSelect={() => false}
      >
        {storeSelectProps.options?.map(({ value, label }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
        }
    </>
  );
}
