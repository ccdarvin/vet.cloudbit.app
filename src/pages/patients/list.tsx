import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import DateField from "../../components/fields/DateField";

export const PatientsList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="name"
                    title={translate("patients.fields.name")}
                />

                <Table.Column
                    dataIndex={["birthday"]}
                    title={translate("patients.fields.birthday")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex="sex"
                    title={translate("patients.fields.sex")}
                />
                <Table.Column
                    title={translate("table.actions")}
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
