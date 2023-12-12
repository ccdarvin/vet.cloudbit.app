import { CSSProperties } from "react";
import {  useThemedLayoutContext } from "@refinedev/antd";
import {
  BarsOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { 
  CanAccess,  
  useLink, 
  useTranslate,
  useNavigation,
  useParsed,
  useResource
} from "@refinedev/core";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import { InfoIcon } from "../icons";



const ResourceLink: React.FC<{
  resrouceName: string,
}> = ({resrouceName}) => {

  const { resource } = useResource(resrouceName);
  const Link = useLink(); 
  const translate = useTranslate();
  const { listUrl } = useNavigation();
  console.log(resource)
  return (
    <CanAccess
        resource={resource.name}
        action="list"
        >
        <Menu.Item
          icon={resource?.meta?.icon}
        >
          <Link to={listUrl(resource.name)}>{translate(`menu.${resource.name}`)}</Link>
        </Menu.Item>
    </CanAccess>
  )
} 

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
  resourceMenuList?: string[],
  resource?: string,
}> = ({
  fixed,
  header,
  resourceMenuList,
  resource,
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

  const { params } = useParsed<{ patient: string }>();

  const infoUrl = resource ? showUrl(resource, params?.patient as string) : "/"
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
        {resourceMenuList?.map((resrouceMenu) => <ResourceLink key={resrouceMenu} resrouceName={resrouceMenu} /> )}
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