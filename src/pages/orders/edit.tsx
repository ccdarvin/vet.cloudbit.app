import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useNotification,
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
  const { params } = useParsed<{ tenant: string, id: string }>();
  const { open } = useNotification();
  const { formProps, saveButtonProps, queryResult } = useForm<
    Tables<"orders">,
    HttpError,
    any
  >({
    meta: {
      select: "*, items:order_items(*)",
    },
    onMutationSuccess: (data, variables, context) => {
      handlerSaveItems(data?.data?.id);
    },
    redirect: false,
  });

  const saveItems = async (items: any[]) => {
    const { data, error } = await supabaseClient
      .from("order_items")
      .upsert(items);
    if (error) {
      open?.({
        type: "error",
        message: "Error",
        description: error.message,
        key: "error",
      });
    }
  };

  const handlerSaveItems = async (id: string) => {
    const form = formProps.form;
    const items = form?.getFieldValue("items") as Tables<"order_items">[];
    const itemsClear = items.map((item) => ({
      ...item,
      order_id: id,
      tenant_id: params?.tenant as string,
    }));

    const itemsToUpdate = itemsClear.filter((item) => item.id);
    // remove id from items to create
    const itemsToCreate = itemsClear.filter((item) => !item.id);
    await saveItems(itemsToUpdate);
    await saveItems(itemsToCreate);
  };

  const drawerFormPropsCreate = useDrawerForm<Tables<"payments">>({
    action: "create",
    resource: "payments",
    syncWithLocation: true,
  });
  const isReadonly = formProps.initialValues?.status !== "Pend";

  return (
    <Flex gap={20} wrap="wrap" >
      <Edit
        saveButtonProps={saveButtonProps}
        footerButtons={({ defaultButtons }) => (
          isReadonly ? null : defaultButtons
        )}

        headerButtons={({ defaultButtons }) => (
          <Space>
            {defaultButtons}
            {formProps.initialValues?.status in ["Pend", "Part"] && (
            <Button
              icon={<PaymentIcon />}
              onClick={() => drawerFormPropsCreate.show()}
            >
              Pagar
            </Button>)}
          </Space>
        )}
      >
        <OrderForm formProps={formProps} isReadonly={isReadonly}/>
        {formProps.initialValues && <PaymentsCreate 
          drawerFormProps={drawerFormPropsCreate} 
          order={formProps.initialValues as Tables<"orders">}
        />}
      </Edit>
      <OrderStatusField value={formProps.initialValues?.status} />
    </Flex>
  );
};
