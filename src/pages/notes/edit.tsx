import { SaveButton, useForm } from "@refinedev/antd";
import { NotesForm } from "./form";
import { on } from "events";

export const NotesEdit = ({
  objectId,
  objectType,
  recordItemId,
  onSucess,
}: {
  objectId: string;
  objectType: string;
  recordItemId: string;
  onSucess?: () => void;
}) => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "notes",
    id: recordItemId,
    action: "edit",
    onMutationSuccess: () => {
      formProps.form?.resetFields();
      onSucess?.();
    },
  });
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10,
      }}
    >
      <NotesForm
        formProps={formProps}
        objectId={objectId}
        objectType={objectType}
      />
      <SaveButton {...saveButtonProps} />
    </div>
  );
};
