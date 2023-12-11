import { CSSProperties } from "react";
import {  useThemedLayoutContext } from "@refinedev/antd";
import {
  BarsOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { 
  ITreeMenu, 
  CanAccess, 
  pickNotDeprecated, 
  useLink, 
  useMenu,
  useTranslate,
  useNavigation,
  useParsed
} from "@refinedev/core";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import { InfoIcon } from "../icons";

const drawerButtonStyles: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  position: "fixed",
  top: 64,
  zIndex: 999,
};

const { useToken } = theme;
const { SubMenu } = Menu;

export const SideBar: React.FC<{
  fixed?: boolean;
  header?: React.ReactNode;
  parentMenuName?: string,
  resourceName?: string,
}> = ({
  fixed,
  header,
  parentMenuName,
  resourceName,
}) => {
  const { token } = useToken();
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  const breakpoint = Grid.useBreakpoint();
  const Link = useLink();
  const translate = useTranslate();
  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const { showUrl } = useNavigation();
  const { menuItems } = useMenu()


  const renderSubMenu = () => {
  // find childer of patients
    const subMenuItem = menuItems?.find(item => item.name === parentMenuName)?.children || []
    console.log(menuItems?.find(item => item.name === parentMenuName))
    return renderTreeView(subMenuItem, undefined)
  }

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const {
        icon,
        label,
        route,
        key,
        name,
        children,
        parentName,
        meta,
        options,
      } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu
              key={item.key}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderSubMenu()}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
          undefined && children.length === 0
      );
      
      const activeItemDisabled = false;
      const linkStyle: React.CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={item.key}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
            style={linkStyle}
          >
            <Link to={route ?? ""} style={linkStyle}>
              {label}
            </Link>
            {!siderCollapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const { params } = useParsed<{ patient: string }>();
  const infoUrl = resourceName ? showUrl(resourceName, params?.patient as string) : "/"
  const info = (  
    <Menu.Item key="info" icon={<InfoIcon />}>
      <Link to={infoUrl}>{translate("menu.info")}</Link>
      {/*!siderCollapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )*/}
    </Menu.Item>
  )


  const renderMenu = () => {
    return (
      <Menu
        mode="inline"
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
        {renderSubMenu()}
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
          bodyStyle={{
            padding: 0,
          }}
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
                {header}
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
            width: siderCollapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        />
      )}
      <Layout.Sider
        style={siderStyles}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed);
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
            {siderCollapsed ? (
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
            width: siderCollapsed ? "80px" : "200px",
            padding: siderCollapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: siderCollapsed ? "center" : "flex-start",
            alignItems: "center",
            backgroundColor: token.colorBgElevated,
            fontSize: "14px",
            paddingTop: "15px",
          }}
        >
          {/*<RenderToTitle collapsed={siderCollapsed} />*/}
          {header}
        </div>
        {renderMenu()}
      </Layout.Sider>
    </>
  );
};


export default SideBar;