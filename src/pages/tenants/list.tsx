import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const TenantList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("tenants.fields.id")}
                />
                <Table.Column
                    dataIndex="name"
                    title={translate("tenants.fields.name")}
                />
                <Table.Column
                    dataIndex="country_code"
                    title={translate("tenants.fields.country_code")}
                />
                <Table.Column
                    dataIndex="currency_code"
                    title={translate("tenants.fields.currency_code")}
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title={translate("tenants.fields.created_at")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["updated_at"]}
                    title={translate("tenants.fields.updated_at")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex="color"
                    title={translate("tenants.fields.color")}
                />
                <Table.Column
                    dataIndex="updated_by"
                    title={translate("tenants.fields.updated_by")}
                />
                <Table.Column
                    dataIndex="phone"
                    title={translate("tenants.fields.phone")}
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
