import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useNotification,
  useTranslate,
} from "@refinedev/core";
import { Button, Flex, Space } from "antd";
import { Edit, useDrawerForm, useForm } from "@refinedev/antd";
import { supabaseClient } from "../../utility";
import { Tables } from "../../types/supabase";
import { OrderForm } from "./form";
import { PaymentIcon } from "../../components/icons";
import { PaymentsCreate } from "../payments";
import OrderStatusField from "../../components/fields/OrderStatusField";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { open } = useNotification();
  
  const { params } = useParsed<{ id: string }>();
  const { formProps, saveButtonProps } = useForm<Tables<"orders">, HttpError>({
    mutationMode: "optimistic",
    meta: {
      select: "*, items:order_items(*)",
    },
    redirect: false,
    warnWhenUnsavedChanges: false
  });

  const handlerSave = async (values: any) => {
    const { items } = values;
    delete values.items;
    const { data, error } = await supabaseClient
      .rpc("update_order_with_items", {
        order_data: {
          ...values,
          id: params?.id,
        },
        items_data: items,
      })

    if (error) {
      open?.({
        type: "error",
        message: translate("notifications.editError"),
        description: translate("notifications.error"),
        key: "error",
      });
      return error
    }
    open?.({
      type: "success",
      message: translate("notifications.editSuccess"),
      description: translate("notifications.success"),
      key: "success",
    });
    return data;
  }

  formProps.onFinish = handlerSave;

  const drawerFormPropsCreate = useDrawerForm<Tables<"payments">>({
    action: "create",
    resource: "payments",
    syncWithLocation: true,
  });
  const isReadonly = formProps.initialValues?.status !== "Pend";

  return (
    <Flex gap={20} wrap="wrap">
      <div style={{ flexGrow: 1 }}>
        <Edit
          saveButtonProps={saveButtonProps}
          footerButtons={({ defaultButtons }) =>
            isReadonly ? null : defaultButtons
          }
          headerButtons={({ defaultButtons }) => (
            <Space>
              {defaultButtons}
              {["Pend", "Part"].includes(formProps.initialValues?.status) && (
                <Button
                  icon={<PaymentIcon />}
                  onClick={() => drawerFormPropsCreate.show()}
                >
                  Pagar
                </Button>
              )}
            </Space>
          )}
        >
          <OrderForm formProps={formProps} isReadonly={isReadonly} />
          {formProps.initialValues && (
            <PaymentsCreate
              drawerFormProps={drawerFormPropsCreate}
              order={formProps.initialValues as Tables<"orders">}
            />
          )}
        </Edit>
      </div>
      <OrderStatusField value={formProps.initialValues?.status} />
    </Flex>
  );
};
