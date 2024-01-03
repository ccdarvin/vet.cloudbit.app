import { useGetIdentity, useGo } from "@refinedev/core";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

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
      console.log(identity)
      go({ to: `${identity?.user_metadata.tenant_id}/` })
    }, [identity])

    return (
        <div>
        <h1>Hello World</h1>
        </div>
    )
}