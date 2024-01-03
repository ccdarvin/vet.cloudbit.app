import { useGetIdentity, useGo } from "@refinedev/core";
import { useEffect } from "react";

type IIdentity = {
    id: number;
    fullName: string;
    user_metadata: {
      tenant_id: number;
    }
  };


export const IndexPage = () => {
    const { data: identity } = useGetIdentity<IIdentity>();
    const go = useGo();
    useEffect(() => {
      go({ to: `/${identity?.user_metadata.tenant_id}/`, type: 'replace'})
    }, [go, identity])

    return (
        <div>
        <h1>Hello World</h1>
        </div>
    )
}