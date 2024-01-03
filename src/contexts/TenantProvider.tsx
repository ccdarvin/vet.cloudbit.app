import { createContext, useEffect, useState } from "react";
import { Tables } from "../types/supabase";
import { useGetIdentity, useList } from "@refinedev/core";

export const TenantContext = createContext({});

type IIdentity = {
  id: number;
  fullName: string;
};

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [tenant, setTenant] = useState<Tables<'tenants'>>();
  const { data: identity } = useGetIdentity<IIdentity>();
  const query = useList<Tables<'tenants'>>({
    resource: "tenants",
    filters: [
      {
        field: "created_by",
        operator: "eq",
        value: identity?.id
      }
    ],
    queryOptions: {
      enabled: !!identity?.id,
    }
  });

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};
