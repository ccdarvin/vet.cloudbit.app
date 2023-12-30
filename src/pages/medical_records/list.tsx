import React, { useEffect } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { List, useDrawerForm } from "@refinedev/antd";
import { Tables } from "../../types/supabase";
import { MedicalRecordsCreate } from "./create";
import { MedicalRecordsTable } from "./table";
import { Segmented, Space } from "antd";
import { MedicalRecordsTimeLine } from "./timeline";

export const MedicalRecordsList: React.FC<IResourceComponentsProps> = () => {
  const drawerFormPropsCreate = useDrawerForm<Tables<"medical_records">>({
    action: "create",
    syncWithLocation: true,
  });

  const [view, setView] = React.useState<string>("timeline");

  const handlerViewChange = (value: string) => {
    // save the view in local storage
    localStorage.setItem("medical_records_view", value);
    setView(value);
  };

  useEffect(() => {
    const view = localStorage.getItem("medical_records_view");
    setView(view || "timeline");
  }, []);

  return (
    <List
      createButtonProps={{
        onClick: () => drawerFormPropsCreate.show(),
      }}
      headerButtons={({ defaultButtons }) => (
        <Space>
          <Segmented
            value={view}
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
              handlerViewChange(value as string);
            }}
          />
          {defaultButtons}
        </Space>
      )}
    >
      {view === "timeline" && <MedicalRecordsTimeLine />}
      {view === "table" && <MedicalRecordsTable />}
      <MedicalRecordsCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
