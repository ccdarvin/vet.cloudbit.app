import { useGetIdentity, useGo } from "@refinedev/core";
import { useEffect } from "react";

type IIdentity = {
  id: number;
  fullName: string;
  user_metadata: {
    tenant_id: number;
  };
};

export const IndexPage = () => {
  const { data: identity, isFetched } = useGetIdentity<IIdentity>();
  const go = useGo();
  useEffect(() => {
    if (isFetched && identity?.user_metadata.tenant_id) {
      go({ to: `/${identity?.user_metadata.tenant_id}/`, type: "replace" });
    } else if (isFetched && !identity?.user_metadata.tenant_id) {
      go({ to: "/tenants", type: "replace" });
    } 
  }, [go, identity]);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};
