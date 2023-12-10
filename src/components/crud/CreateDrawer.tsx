import React from "react";
import {
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useRouterType,
  useResource,
  useBack,
} from "@refinedev/core";
import {
  Breadcrumb,
  SaveButton,
  PageHeader,
  SaveButtonProps,
} from "@refinedev/antd";
import { Card, Drawer, Space, Spin } from "antd";
import type { CreateProps } from "@refinedev/antd";

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/create} for more details.
 */
export const CreateDrawer: React.FC<CreateProps & { drawerProps: any }> = ({
  title,
  saveButtonProps: saveButtonPropsFromProps,
  children,
  resource: resourceFromProps,
  isLoading = false,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
  drawerProps,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const routerType = useRouterType();
  const back = useBack();
  const { goBack } = useNavigation();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, action, identifier } = useResource(resourceFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
    htmlType: "submit",
  };

  const defaultFooterButtons = (
    <>
      <SaveButton {...saveButtonProps} />
    </>
  );

  return (
    <Drawer
      {...drawerProps}
      width={720}
      maskClosable={false}
      mask={false}
      title={
        title ??
        translate(
          `${identifier}.titles.create`,
          `Create ${getUserFriendlyName(
            resource?.meta?.label ??
              resource?.options?.label ??
              resource?.label ??
              identifier,
            "singular"
          )}`
        )
      }
      extra={
        <Space wrap {...(headerButtonProps ?? {})}>
          {headerButtons
            ? typeof headerButtons === "function"
              ? headerButtons({
                  defaultButtons: null,
                })
              : headerButtons
            : null}
        </Space>
      }
      footer={
        <Space
          key="action-buttons"
          style={{ float: "right", marginRight: 24 }}
          {...(footerButtonProps ?? {})}
        >
          {footerButtons
            ? typeof footerButtons === "function"
              ? footerButtons({
                  defaultButtons: defaultFooterButtons,
                  saveButtonProps: saveButtonProps,
                })
              : footerButtons
            : defaultFooterButtons}
        </Space>
      }
    >
      <Spin spinning={isLoading}>{children}</Spin>
    </Drawer>
  );
};

export default CreateDrawer;
