import { FormProps } from "antd/lib";
import { useTranslate, useParsed, useDelete } from "@refinedev/core";
import { Form, Input, Table, Button, InputNumber, Space } from "antd";
import ItemSelect from "../../components/controls/ItemSelect";
import { Tables } from "../../types/supabase";
import CustomerSelect from "../../components/controls/CustomerSelect";
import { DeleteOutlined } from "@ant-design/icons";
import OrderStatusSteps from "../../components/controls/OrderStatusSteps";

export const OrderForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();
  const { form } = formProps;
  const { mutate } = useDelete();

  const handleTotals = () => {
    // create totals, fields are: subtotal_base, discount, subtotal, total

    const items = form?.getFieldValue("items") as Tables<"order_items">[];
    const subtotal_base =
      Math.round(
        items?.reduce((acc, item) => acc + Number(item.subtotal), 0) * 100
      ) / 100;
    const discount = form?.getFieldValue("discount");
    const total = Math.round(subtotal_base * (1 - discount / 100) * 100) / 100;
    // set values
    form?.setFieldValue("subtotal_base", subtotal_base);
    form?.setFieldValue("total", total);
    console.log(items);
  };

  return (
    <Form
      {...formProps}
      onFinish={(values: any) => {
        const { items } = values;
        delete values.items;
        return formProps.onFinish?.({
          ...values,
          tenant_id: params?.tenant as string,
        });
      }}
      onFieldsChange={(changedFields, allFields) => {
        handleTotals();
      }}
      layout="vertical"
    >
      <Form.Item
        label={translate("orders.fields.status")}
        name={["status"]}
        >
          <OrderStatusSteps />
        </Form.Item>
      <Form.Item
        label={translate("orders.fields.customer")}
        name={"customer_id"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <CustomerSelect />
      </Form.Item>

      <Form.List name="items">
        {(fields, { add, remove, ...props }) => (
          <>
            <Table
              pagination={false}
              size="small"
              bordered
              showHeader={true}
              title={() => "Productos"}
              dataSource={fields.map((field, index) => ({
                ...field,
                id: index,
              }))}
              footer={() => (
                <div className="px-8 py-2">
                  <Button
                    type="dashed"
                    className="w-full"
                    onClick={() => {
                      add({
                        item_id: null,
                        quantity: 1,
                        price_base: 0,
                        discount: 0,
                        price: 0,
                        subtotal: 0,
                      });
                    }}
                  >
                    Agregar producto
                  </Button>
                </div>
              )}
            >
              <Table.Column
                title="Producto o servicio"
                dataIndex="item_id"
                key="item_id"
                render={(value, record: Tables<"order_items">, index) => (
                  <>
                    <Form.Item
                      name={[index, "item_id"]}
                      noStyle
                      rules={[{ required: true, message: "Missing item" }]}
                    >
                      <ItemSelect
                        onChange={(value, options: any) => {
                          form?.setFieldValue(
                            ["items", index, "price_base"],
                            options?.item.price
                          );
                          form?.setFieldValue(
                            ["items", index, "subtotal"],
                            options?.item.price
                          );
                          return value;
                        }}
                      />
                    </Form.Item>
                  </>
                )}
              />
              <Table.Column
                title="Cantidad"
                dataIndex="quantity"
                key="quantity"
                render={(value, record: Tables<"order_items">, index) => (
                  <Form.Item
                    name={[index, "quantity"]}
                    noStyle
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <InputNumber
                      className="w-full"
                      onChange={(value) => {
                        value = Number(value || 0);
                        const discount = form?.getFieldValue([
                          "items",
                          index,
                          "discount",
                        ]);
                        const price_base = form?.getFieldValue([
                          "items",
                          index,
                          "price_base",
                        ]);
                        const price =
                          Math.round(price_base * (1 - discount / 100) * 100) /
                          100;
                        const subtotal = Math.round(price * value * 100) / 100;
                        form?.setFieldValue(["items", index, "price"], price);
                        form?.setFieldValue(
                          ["items", index, "subtotal"],
                          subtotal
                        );
                      }}
                    />
                  </Form.Item>
                )}
              />
              <Table.Column
                title="Precio unitario"
                dataIndex="price"
                key=">"
                render={(value, record: Tables<"order_items">, index) => (
                  <Space.Compact
                    block
                    style={{
                      maxWidth: 200,
                    }}
                  >
                    <Form.Item
                      name={[index, "price_base"]}
                      noStyle
                      rules={[
                        { required: true, message: "Missing unit price" },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        onChange={(value) => {
                          value = Number(value || 0);
                          const discount = form?.getFieldValue([
                            "items",
                            index,
                            "discount",
                          ]);
                          const quantity = form?.getFieldValue([
                            "items",
                            index,
                            "quantity",
                          ]);
                          const price =
                            Math.round(value * (1 - discount / 100) * 100) /
                            100;
                          const subtotal =
                            Math.round(price * quantity * 100) / 100;
                          form?.setFieldValue(["items", index, "price"], price);
                          form?.setFieldValue(
                            ["items", index, "subtotal"],
                            subtotal
                          );
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, "discount"]}
                      noStyle
                      rules={[{ required: true, message: "Missing discount" }]}
                    >
                      <InputNumber
                        onChange={(value) => {
                          value = Number(value || 0);
                          const price_base = form?.getFieldValue([
                            "items",
                            index,
                            "price_base",
                          ]);
                          const quantity = form?.getFieldValue([
                            "items",
                            index,
                            "quantity",
                          ]);
                          const price = price_base * (1 - value / 100);
                          const subtotal = price * quantity;
                          form?.setFieldValue(["items", index, "price"], price);
                          form?.setFieldValue(
                            ["items", index, "subtotal"],
                            subtotal
                          );
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, "price"]}
                      noStyle
                      rules={[
                        { required: true, message: "Missing unit price" },
                      ]}
                    >
                      <InputNumber
                        bordered={false}
                        className="w-full"
                        readOnly
                      />
                    </Form.Item>
                  </Space.Compact>
                )}
              />
              <Table.Column
                title="Subtotal"
                dataIndex="subtotal"
                key="subtotal"
                render={(value, record, index) => (
                  <Form.Item
                    name={[index, "subtotal"]}
                    noStyle
                    rules={[{ required: true, message: "Missing subtotal" }]}
                  >
                    <Input bordered={false} className="w-full" readOnly />
                  </Form.Item>
                )}
              />
              <Table.Column
                title="Acciones"
                dataIndex="id"
                key="actions"
                render={(value, record, index) => {
                  const item = form?.getFieldValue(["items", index]);
                  return (
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => {
                        console.log(item);
                        if (item.id) {
                          mutate({
                            resource: "order_items",
                            id: item?.id,
                          })
                        }
                        remove(index);
                      }}
                    />
                  );
                }}
              />
            </Table>
          </>
        )}
      </Form.List>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Space.Compact>
          <Form.Item
            label={translate("orders.fields.subtotal_base")}
            name={["subtotal_base"]}
          >
            <Input readOnly bordered={false} />
          </Form.Item>
          <Form.Item label={translate("orders.fields.total")} name={["total"]}>
            <Input readOnly bordered={false} />
          </Form.Item>
        </Space.Compact>
      </div>
    </Form>
  );
};
