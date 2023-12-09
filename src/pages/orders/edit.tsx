import { IResourceComponentsProps, useTranslate, useParsed, HttpError } from "@refinedev/core"
import { Form, Input, Select, Table, Button, InputNumber, Space } from "antd"
import ItemSelect from "../../components/controls/ItemSelect";
import { Edit, useForm, useSelect } from "@refinedev/antd"
import { supabaseClient } from "../../utility";
import { Tables } from "../../types/supabase";


export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { params } = useParsed<{ tenant: string }>();

  const { formProps, saveButtonProps, queryResult, onFinish } = useForm<Tables<'orders'>, HttpError, any>({
    meta: {
      select: "*, items:order_items(*)",
    },
    onMutationSuccess: (data, variables, context) => {
      handlerFinish(data?.data?.id)
    },
  });
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

  const handleTotals = () => {
    // create totals, fields are: subtotal_base, discount, subtotal, total

    const items = form.getFieldValue('items') as Tables<'order_items'>[]
    const subtotal_base = Math.round(items?.reduce((acc, item) => acc + Number(item.subtotal), 0)*100)/100
    const discount = form.getFieldValue('discount')
    const total = Math.round(subtotal_base * (1 - discount / 100)*100)/100
    // set values
    form.setFieldValue('subtotal_base', subtotal_base)
    form.setFieldValue('total', total)
  }

  const handlerFinish = async (id: string) => {
    const form = formProps.form
    const items = form?.getFieldValue('items') as Tables<'order_items'>[]
    const { data, error } = await supabaseClient.from('order_items').upsert(
      items.map(item => ({...item, order_id: id, tenant_id: params?.tenant as string}))
    )
    console.log(data, error)
  }
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form 
        {...formProps}
        onFinish={(values: any) => {
          const { items } = values
          delete values.items
          return formProps.onFinish?.({
            ...values,
            tenant_id: params?.tenant as string,
          });
        }}
        onFieldsChange={(changedFields, allFields) => {
          handleTotals()
        }}
        layout="vertical"
      >
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
                    <>
                      <Form.Item
                        name={[index, 'item_id']}
                        noStyle
                        rules={[{ required: true, message: 'Missing item' }]}
                      >
                        <ItemSelect onChange={(value, options: any ) => {
                          form.setFieldValue(['items', index, 'unit_price_base'], options?.item.price)
                          form.setFieldValue(['items', index, 'subtotal'], options?.item.price)
                          return value
                        }} />
                      </Form.Item>
                    </>
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
                      <InputNumber className="w-full"
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
                    <Space.Compact block style={{
                      maxWidth: 200
                    }}>
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
                        <InputNumber bordered={false} className="w-full" readOnly />
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
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "column",
            gap: 8,
            marginTop: 16
          }}
        >
          <Space.Compact>
            <Form.Item
              label={translate("orders.fields.subtotal_base")}
              name={["subtotal_base"]}
            >
              <Input readOnly bordered={false} />
            </Form.Item>
            <Form.Item
              label={translate("orders.fields.discount")}
              name={["discount"]}
            >
              <Input readOnly bordered={false} />
            </Form.Item>
            <Form.Item
              label={translate("orders.fields.total")}
              name={["total"]}
            >
              <Input readOnly bordered={false} />
            </Form.Item>
          </Space.Compact>
        </div>
      </Form>
    </Edit>
  );
};
