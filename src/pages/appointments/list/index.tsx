import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { List, useDrawerForm } from "@refinedev/antd";
import { Space, Segmented } from "antd";
import { AppointmentsTable } from "./table";
import { AppointmentsCalendar } from "./calendar";
import { AppointmentsCreate } from "../create";
import { Tables } from "../../../types/supabase";
import { AppointmentsSimpleList } from "./list";

export const AppointmentsList: React.FC<IResourceComponentsProps> = () => {
  const drawerFormPropsCreate = useDrawerForm<Tables<"patients">>({
    action: "create",
    syncWithLocation: true,
  });

  const [view, setView] = useState<string>("calendar");

  const handlerViewChange = (value: string) => {
    // save the view in local storage
    localStorage.setItem("appointments_view", value);
    setView(value);
  };

  useEffect(() => {
    const view = localStorage.getItem("appointments_view");
    setView(view || "calendar");
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
            size="large"
            options={[
              {
                label: "Tabla",
                value: "table",
              },
              {
                label: "Lista",
                value: "list",
              },
              {
                label: "Calendario",
                value: "calendar",
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
      {view === "table" && <AppointmentsTable />}
      {view === "calendar" && <AppointmentsCalendar />}
      {view === "list" && <AppointmentsSimpleList />}
      <AppointmentsCreate drawerFormProps={drawerFormPropsCreate} />
    </List>
  );
};
