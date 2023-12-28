import { useTranslate } from "@refinedev/core";
import { Badge } from "antd";
import { appointmentStatusOptions } from "../../constants";




export default function AppointmentStatusField({
    value,
}: {
    value?: string;
}) {
    const translate = useTranslate();
    const status = appointmentStatusOptions.find((item) => item.value === value);

    return (
    <Badge color={status?.color} text={translate('appointments.enums.status.' + status?.value)} />
    );
}