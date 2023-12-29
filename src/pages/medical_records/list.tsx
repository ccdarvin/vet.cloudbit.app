import React from "react";
import { IResourceComponentsProps, useGo } from "@refinedev/core";
import { List, useDrawerForm } from "@refinedev/antd";
import { Tables } from "../../types/supabase";
import { MedicalRecordsCreate } from "./create";
import { MedicalRecordsTable } from "./table";
import { Segmented, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { MedicalRecordsTimeLine } from "./timeline";

export const MedicalRecordsList: React.FC<IResourceComponentsProps> = () => {
  const drawerFormPropsCreate = useDrawerForm<Tables<"medical_records">>({
    action: "create",
    syncWithLocation: true,
  });
  const [searchParams] = useSearchParams();
  const go = useGo();
  return (
    <List
      createButtonProps={{
        onClick: () => drawerFormPropsCreate.show(),
      }}
      headerButtons={({ defaultButtons }) => (
        <Space>
          <Segmented
            value={searchParams.get("view") || "timeline"}
            options={[
              {
                label: "Tabla",
                value: "table",
              },
              {
                label: "Linea de tiempo",
                value: "timeline",
              },
            ]}
            onChange={(value) => {
              go({ query: { view: value } });
            }}
          />
          {defaultButtons}
        </Space>
      )}
    >
      {searchParams.get("view") === "timeline" && (
        <MedicalRecordsTimeLine />
      )}
      {searchParams.get("view") === "table" && (
        <MedicalRecordsTable />
      )}
      <MedicalRecordsCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
