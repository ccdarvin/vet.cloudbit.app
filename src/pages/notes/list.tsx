import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  useSimpleList,
} from "@refinedev/antd";
import { Enums, Tables } from "../../types/supabase";
import { useParsed } from "@refinedev/core";
import { List as ListAnt, Space, Typography } from "antd";
import { useState } from "react";
import DateField from "../../components/fields/DateField";
import { NotesCreate } from "./create";
import { NotesEdit } from "./edit";

type NotesListProps = {
  objectId: string;
  objectType: Enums<"object_type">;
};

export const NotesList = ({ objectId, objectType }: NotesListProps) => {
  const { params } = useParsed<{ tenant: string }>();
  const [id, setId] = useState<string>("");

  const { listProps } = useSimpleList<Tables<"notes">>({
    resource: "notes",
    sorters: {
      permanent: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
    filters: {
      permanent: [
        {
          field: "object_id",
          operator: "eq",
          value: objectId,
        },
        {
          field: "object_type",
          operator: "eq",
          value: objectType,
        },
        {
          field: "tenant_id",
          operator: "eq",
          value: params?.tenant,
        },
      ],
    },
  });
  return (
    <List headerButtons={[<CreateButton onClick={() => setId("add")} />]}>
      {!id && <NotesCreate objectId={objectId} objectType={objectType} />}
      <ListAnt
        {...listProps}
        itemLayout="vertical"
        bordered
        size="small"
        extra={<a href="#">More</a>}
        renderItem={(item) => (
          <>
            {item.id === id ? (
              <NotesEdit
                onSucess={() => setId("")}
                recordItemId={item.id}
                objectId={objectId}
                objectType={objectType}
              />
            ) : (
              <ListAnt.Item
                extra={
                  <Space>
                    <EditButton
                      hideText
                      type="text"
                      recordItemId={item.id}
                      onClick={() => setId(item.id)}
                    />
                    <DeleteButton
                      hideText
                      type="text"
                      recordItemId={item.id}
                      resource="notes"
                    />
                  </Space>
                }
                actions={[
                  <DateField
                    format="L LT"
                    type="secondary"
                    value={item.created_at}
                  />,
                ]}
              >
                <Typography.Text>{item.note}</Typography.Text>
              </ListAnt.Item>
            )}
          </>
        )}
      ></ListAnt>
    </List>
  );
};
