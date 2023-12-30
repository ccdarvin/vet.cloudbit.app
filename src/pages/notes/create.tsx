import { SaveButton, useForm } from "@refinedev/antd";
import { NotesForm } from "./form";

export const NotesCreate = ({
  objectId,
  objectType,
  onSucess
}: {
  objectId: string;
  objectType: string;
  onSucess?: () => void;
}) => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "notes",
    action: "create",
    onMutationSuccess: () => {
      formProps.form?.resetFields();
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 10,
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
