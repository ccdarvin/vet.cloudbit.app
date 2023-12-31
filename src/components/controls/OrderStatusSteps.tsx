import { Steps } from "antd";
import { OrderStatusOptions } from "../../constants";
import { useTranslate } from "@refinedev/core";



export default function OrderStatusSteps({
    value,
    percent,
}: {
    value?: string;
    percent?: number;
}) {
    const step = OrderStatusOptions.findIndex((item) => item.value === value);
    const translate = useTranslate();

    return (
        <Steps
            size="small"
            current={step}
            percent={percent}
        >
            {OrderStatusOptions.map((item) => (
                <Steps.Step
                    key={item.value}
                    title={translate(`orders.enums.status.${item.value}`)}
                />
            ))}
        </Steps>
    )
}