import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useNotification,
  useGo,
  useTranslate,
} from "@refinedev/core";
import { Button, Flex, Space } from "antd";
import { Create, useDrawerForm, useForm } from "@refinedev/antd";
import { supabaseClient } from "../../utility";
import { Tables } from "../../types/supabase";
import { OrderForm } from "./form";
import { PaymentIcon } from "../../components/icons";
import { PaymentsCreate } from "../payments";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();
  const { open } = useNotification();
  const translate = useTranslate();
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
      .rpc("create_order_with_items", {
        order_data: values,
        items_data: items,
      })

    if (error) {
      open?.({
        type: "error",
        message: translate("notifications.createError"),
        description: translate("notifications.error"),
        key: "error",
      });
      console.debug(error);
      return error
    }
    go({
      to: {
        resource: "orders",
        action: "edit",
        id: data,
      }
    });
    open?.({
      type: "success",
      message: translate("notifications.createSuccess"),
      description: translate("notifications.success"),
      key: "success",
    });
    return data;
  }

  formProps.onFinish = handlerSave
  const drawerFormPropsCreate = useDrawerForm<Tables<"payments">>({
    action: "create",
    resource: "payments",
    syncWithLocation: true,
  });
  const isReadonly = formProps.initialValues?.status && formProps.initialValues?.status !== "Pend";

  return (
    <Flex gap={20} wrap="wrap">
      <div style={{ flexGrow: 1 }}>
        <Create
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
        </Create>
      </div>
    </Flex>
  );
};
