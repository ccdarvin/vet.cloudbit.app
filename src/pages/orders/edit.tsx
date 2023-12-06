import { IResourceComponentsProps, useTranslate } from "@refinedev/core"
import { Edit, useForm, useSelect } from "@refinedev/antd"
import { Form, Input, Select, Table, Button, InputNumber, Space } from "antd"
import { Tables } from "../../types/supabase";


export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();
  const { form } = formProps;
  const ordenesData = queryResult?.data?.data;

  const { selectProps: customerSelectProps } = useSelect({
    resource: "customers",
    defaultValue: ordenesData?.customer_id,
    optionLabel: "name",
  });

  if (!form) {
    return null;
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("orders.fields.customer")}
          name={"customer_id"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...customerSelectProps} />
        </Form.Item>

        <Form.List
          name="items"
        >
          {(fields, { add, remove, ...props }) => (
            <>
              <Table
                pagination={false}
                size="small"
                bordered
                showHeader={true}
                title={() => 'Productos'}
                dataSource={fields.map((field, index) => ({
                  ...field,
                  id: index,
                }))}
                footer={() => <div className="px-8 py-2">
                  <Button
                  type="dashed"
                  className="w-full"
                    onClick={() => {
                      add({
                        item_id: null,
                        quantity: 1,
                        unit_price_base: 0,
                        discount: 0,
                        unit_price: 0,
                        subtotal: 0,
                      })
                    }}
                  >
                    Agregar producto
                  </Button>
                </div>}
              >
                <Table.Column
                  title="Producto o servicio"
                  dataIndex="item_id"
                  key="item_id"
                  render={(value, record: Tables<'order_items'>, index) => (
                    <Form.Item
                      name={[index, 'item_id']}
                      noStyle
                      rules={[{ required: true, message: 'Missing item' }]}
                    >
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="Cantidad"
                  dataIndex="quantity"
                  key="quantity"
                  render={(value, record: Tables<'order_items'>, index) => (
                    <Form.Item
                      name={[index, 'quantity']}
                      noStyle
                      rules={[{ required: true, message: 'Missing quantity' }]}
                    >
                      <InputNumber bordered={false} className="w-full"
                        onChange={(value) => {
                          value = Number(value || 0)
                          const discount = form.getFieldValue(['items', index, 'discount'])
                          const unit_price_base = form.getFieldValue(['items', index, 'unit_price_base'])
                          const unit_price = Math.round(unit_price_base * (1 - discount / 100) * 100) / 100
                          const subtotal = Math.round(unit_price * value * 100) / 100
                          form.setFieldValue(['items', index, 'unit_price'], unit_price)
                          form.setFieldValue(['items', index, 'subtotal'], subtotal)
                        }} />
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="Precio unitario"
                  dataIndex="unit_price"
                  key="unit_price"
                  render={(value, record: Tables<'order_items'>, index) => (
                    <Space.Compact>
                      <Form.Item
                        name={[index, 'unit_price_base']}
                        noStyle
                        rules={[{ required: true, message: 'Missing unit price' }]}
                      >
                        <InputNumber  className="w-full"
                          onChange={(value) => {
                            value = Number(value || 0)
                            const discount = form.getFieldValue(['items', index, 'discount'])
                            const quantity = form.getFieldValue(['items', index, 'quantity'])
                            const unit_price = Math.round(value * (1 - discount / 100) * 100) / 100
                            const subtotal = Math.round(unit_price * quantity * 100) / 100
                            form.setFieldValue(['items', index, 'unit_price'], unit_price)
                            form.setFieldValue(['items', index, 'subtotal'], subtotal)
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[index, 'discount']}
                        noStyle
                        rules={[{ required: true, message: 'Missing discount' }]}
                      >
                        <InputNumber
                          onChange={(value) => {
                            value = Number(value || 0)
                            const unit_price_base = form.getFieldValue(['items', index, 'unit_price_base'])
                            const quantity = form.getFieldValue(['items', index, 'quantity'])
                            const unit_price = unit_price_base * (1 - value / 100)
                            const subtotal = unit_price * quantity
                            form.setFieldValue(['items', index, 'unit_price'], unit_price)
                            form.setFieldValue(['items', index, 'subtotal'], subtotal)
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[index, 'unit_price']}
                        noStyle
                        rules={[{ required: true, message: 'Missing unit price' }]}
                      >
                        <Input bordered={false} className="w-full" readOnly />
                      </Form.Item>
                    </Space.Compact>
                  )}
                />
                <Table.Column
                  title="Subtotal"
                  dataIndex="subtotal"
                  key="subtotal"
                  render={(value,
                    record: Tables<'order_items'>,
                    index,
                  ) => (
                    <Form.Item
                      name={[index, 'subtotal']}
                      noStyle
                      rules={[{ required: true, message: 'Missing subtotal' }]}
                    >
                      <Input bordered={false} className="w-full" readOnly />
                    </Form.Item>
                  )}
                />
              </Table>
            </>
          )}
        </Form.List>
        <Form.Item
          label={translate("orders.fields.subtotal_base")}
          name={["subtotal_base"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("orders.fields.discount")}
          name={["discount"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("orders.fields.total")}
          name={["total"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
