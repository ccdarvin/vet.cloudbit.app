import { IResourceComponentsProps, useGo, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Select,
  Space,
  Typography,
  Flex,
} from "antd";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import countryNames from "react-phone-number-input/locale/es.json";
import { currencies } from "../../constants/countries";

export const TenantCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const go = useGo();
  const { formProps, saveButtonProps } = useForm({
    meta: {
      select: "*",
    },
    redirect: false,
    onMutationSuccess(data, variables, context, isAutoSave) {
      if (!isAutoSave) {
        go({
          to: `/${data?.data?.id}/`,
        });
      }
    },
  });

  return (
    <Flex justify="center">

      <Create
        breadcrumb={false}
        goBack={false}
        title={'Add Tenant'}
      saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            label={translate("tenants.fields.name")}
            name={["name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item required label={translate("tenants.fields.phone")}>
            <Space.Compact block>
              <Form.Item
                noStyle
                name={["country_code"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  style={{ width: 120 }}
                  dropdownStyle={{ width: 350 }}
                  showSearch
                  allowClear
                  optionLabelProp="label"
                >
                  {getCountries().map((country) => (
                    <Select.Option
                      key={country}
                      value={country}
                      label={
                        <Space>
                          <Typography.Text>{country}</Typography.Text>
                          <Typography.Text type="secondary">
                            ({getCountryCallingCode(country)})
                          </Typography.Text>
                        </Space>
                      }
                    >
                      <Space>
                        <Typography.Text>{countryNames[country]}</Typography.Text>
                        <Typography.Text type="secondary">
                          ({getCountryCallingCode(country)})
                        </Typography.Text>
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                name={["phone"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            label={translate("tenants.fields.currency")}
            name={["currency_code"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select showSearch allowClear>
              {currencies.map((currency) => (
                <Select.Option key={currency.code} value={currency.code}>
                  <Space>
                    <Typography.Text>{currency.name}</Typography.Text>
                    <Typography.Text type="secondary">
                      ({currency.code})
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      {currency.symbol}
                    </Typography.Text>
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Create>
    </Flex>
  );
};
