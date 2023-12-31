import {
  IResourceComponentsProps,
  useTranslate,
  useParsed,
  HttpError,
  useNotification,
} from "@refinedev/core";
import { Form, Input, Select, Table, Button, InputNumber, Space } from "antd";
import ItemSelect from "../../components/controls/ItemSelect";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { supabaseClient } from "../../utility";
import { Tables } from "../../types/supabase";
import { OrderForm } from "./form";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed<{ tenant: string }>();
  const { open } = useNotification();
  const { formProps, saveButtonProps } = useForm<
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

  const saveItems = async (items:any[]) => {
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
  }

  const handlerSaveItems = async (id: string) => {
    const form = formProps.form;
    const items = form?.getFieldValue("items") as Tables<"order_items">[];
    const itemsClear = items.map((item) => ({
      ...item,
      order_id: id,
      tenant_id: params?.tenant as string,
    }))
    
    const itemsToUpdate = itemsClear.filter((item) => item.id);
    // remove id from items to create
    const itemsToCreate = itemsClear.filter((item) => !item.id);
    await saveItems(itemsToUpdate)
    await saveItems(itemsToCreate)
    
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <OrderForm formProps={formProps} />
    </Edit>
  );
};
