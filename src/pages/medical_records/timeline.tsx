import {
  IResourceComponentsProps,
  useList,
  useTranslate,
} from "@refinedev/core";
import { Tables } from "../../types/supabase";
import { Card, Flex, Timeline, Typography } from "antd";
import { EditButton, useDrawerForm } from "@refinedev/antd";
import { MedicalRecordsEdit } from "./edit";
import DateField from "../../components/fields/DateField";

interface IMedicalRecords extends Tables<"medical_records"> {
  patient: Tables<"patients">;
  doctor: Tables<"staff">;
  treatment_type: Tables<"treatment_types">;
}

export const MedicalRecordsTimeLine: React.FC<
  IResourceComponentsProps
> = () => {
  const translate = useTranslate();
  const { data: medicalRecords } = useList<IMedicalRecords>({
    resource: "medical_records",
    meta: {
      select:
        "*, patient:patient_id(*), doctor:doctor_id(*), treatment_type:treatment_type_id(*)",
    },
    sorters: [
      {
        field: "date",
        order: "desc",
      },
    ],
  });
  const drawerFormPropsEdit = useDrawerForm<Tables<"medical_records">>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <Card>
        <Timeline>
          {medicalRecords?.data?.map((record) => (
            <Timeline.Item key={record.id}>
              <Flex vertical gap={10}>
                <Flex align="center" gap={20}>
                  <Typography.Text>
                    {record?.treatment_type?.name}
                  </Typography.Text>
                  <DateField
                    format="L LT"
                    type="secondary"
                    value={record.date}
                  />
                  <EditButton
                    hideText
                    recordItemId={record.id}
                    onClick={() => drawerFormPropsEdit.show(record.id)}
                  />
                </Flex>
                <Flex gap={8}>
                  <Typography.Text type="secondary">
                    {translate("medical_records.fields.doctor")}:
                  </Typography.Text>
                  <Typography.Text>{record.patient.name}</Typography.Text>
                </Flex>
                <Flex gap={20} wrap="wrap">
                  {record.symptoms && (
                    <Card
                      size="small"
                      bordered={false}
                      style={{ minWidth: 400 }}
                      title={
                        <Typography.Text type="secondary">
                          {translate("medical_records.fields.symptoms")}
                        </Typography.Text>
                      }
                    >
                      {record.symptoms}
                    </Card>
                  )}
                  {record.diagnosis && (
                    <Card
                      size="small"
                      bordered={false}
                      style={{ minWidth: 400 }}
                      title={
                        <Typography.Text type="secondary">
                          {translate("medical_records.fields.diagnosis")}
                        </Typography.Text>
                      }
                    >
                      {record.diagnosis}
                    </Card>
                  )}
                  {record.treatment && (
                    <Card
                      size="small"
                      bordered={false}
                      style={{ minWidth: 400 }}
                      title={
                        <Typography.Text type="secondary">
                          {translate("medical_records.fields.treatment")}
                        </Typography.Text>
                      }
                    >
                      {record.treatment}
                    </Card>
                  )}
                </Flex>
              </Flex>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
      <MedicalRecordsEdit drawerFormProps={drawerFormPropsEdit} />
    </>
  );
};
