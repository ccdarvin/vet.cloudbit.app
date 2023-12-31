import { CSSProperties, useState } from "react";
import { useThemedLayoutContext } from "@refinedev/antd";
import { BarsOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  CanAccess,
  useLink,
  useTranslate,
  useNavigation,
  useParsed,
  useResource,
} from "@refinedev/core";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import { InfoIcon } from "../icons";

const ResourceLink: React.FC<{
  resrouceName: string;
}> = ({ resrouceName }) => {
  const { resource } = useResource(resrouceName);
  const Link = useLink();
  const { listUrl } = useNavigation();
  return (
    <CanAccess resource={resource.name} action="list">
      <Menu.Item
        key={resource?.identifier || resource.name}
        icon={resource?.meta?.icon}
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Link to={listUrl(resource?.identifier || resource.name)}>
          {resource?.meta?.label || resource.name}
        </Link>
      </Menu.Item>
    </CanAccess>
  );
};

const drawerButtonStyles: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  position: "fixed",
  top: 64,
  zIndex: 999,
};

const { useToken } = theme;

export const SideBar: React.FC<{
  fixed?: boolean;
  header?: React.ReactNode;
  resourceMenuList?: string[];
}> = ({ fixed, header, resourceMenuList }) => {
  const { token } = useToken();
  const {
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  const breakpoint = Grid.useBreakpoint();
  const [collapsed, setcollapsed] = useState(false);
  const Link = useLink();
  const translate = useTranslate();
  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const { showUrl } = useNavigation();

  const { resource: currentResource } = useResource();

  const { params } = useParsed();
  const infoUrl = currentResource
    ? showUrl(currentResource?.meta?.param || "", params?.id as string)
    : "/";
  const info = (
    <Menu.Item key="info" icon={<InfoIcon />}>
      <Link to={infoUrl}>{translate("menu.info")}</Link>
      {/*!collapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )*/}
    </Menu.Item>
  );

  const renderMenu = () => {
    return (
      <Menu
        mode="inline"
        selectedKeys={[
          currentResource?.identifier || currentResource?.name || "info",
        ]}
        style={{
          paddingTop: "8px",
          border: "none",
          overflow: "auto",
          height: "calc(100% - 72px)",
        }}
        onClick={() => {
          setMobileSiderOpen(false);
        }}
      >
        {info}
        {resourceMenuList?.map((resrouceMenu) => (
          <ResourceLink key={resrouceMenu} resrouceName={resrouceMenu} />
        ))}
      </Menu>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          placement="left"
          closable={false}
          width={200}
          maskClosable={true}
        >
          <Layout>
            <Layout.Sider
              style={{
                height: "100vh",
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
              }}
            >
              <div
                style={{
                  width: "200px",
                  padding: "0 16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: token.colorBgElevated,
                }}
              >
                {/*<RenderToTitle collapsed={false} />*/}
                {!collapsed ? header: null}
              </div>
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        <Button
          style={drawerButtonStyles}
          size="large"
          onClick={() => setMobileSiderOpen(true)}
          icon={<BarsOutlined />}
        ></Button>
      </>
    );
  };

  if (isMobile) {
    return renderDrawerSider();
  }

  const siderStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBgElevated}`,
    minHeight: "86vh",
  };

  if (fixed) {
    siderStyles.position = "fixed";
    siderStyles.top = 0;
    siderStyles.height = "100vh";
    siderStyles.zIndex = 999;
  }

  return (
    <>
      {fixed && (
        <div
          style={{
            width: collapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        />
      )}
      <Layout.Sider
        style={siderStyles}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setcollapsed(collapsed);
          }
        }}
        collapsedWidth={80}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: token.colorBgElevated,
            }}
          >
            {collapsed ? (
              <RightOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            ) : (
              <LeftOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            )}
          </Button>
        }
      >
        <div
          style={{
            width: collapsed ? "80px" : "200px",
            padding: collapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
            alignItems: "center",
            backgroundColor: token.colorBgElevated,
            fontSize: "14px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          {/*<RenderToTitle collapsed={collapsed} />*/}
          {!collapsed ? header: null}
        </div>
        {renderMenu()}
      </Layout.Sider>
    </>
  );
};

export default SideBar;
