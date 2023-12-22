import { Authenticated, Refine, useParsed, useTranslate } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { TenantCreate, TenantEdit, TenantList, TenantShow } from "./pages/tenants";
import { PatientsList, PacientShow, PatientLayout } from "./pages/patients";
import { SpeciesList } from "./pages/species";
import { CustomerList } from "./pages/customers";
import { ItemList } from "./pages/items";
import { ServiceList } from "./pages/services01";
import { OrderEdit, OrderList, OrderShow } from "./pages/orders";
import { AntiparasithicsIcon, PatientIcon, VaccineIcon } from "./components/icons";
import { VaccinesList } from "./pages/services";
import { AntiparasithicsList } from "./pages/antiparasithics";

function App() {
  const { t, i18n } = useTranslation(['common']);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const { params } = useParsed<{ tenant: string, patient: string }>();
  const translate = useTranslate();

  const tenant = params?.tenant;
  const patient = params?.patient;

  return (
    <BrowserRouter>
      {/*<GitHubBanner />*/}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                i18nProvider={i18nProvider}
                resources={[{
                  name: "tenants",
                  list: "/tenant",
                  create: "/tenant/create",
                  edit: "/tenant/edit/:id",
                  show: "/tenant/show/:id"
                }, {
                  name: "patients",
                  list: "/:tenant/patient",
                  show: "/:tenant/patient/:id",
                  meta: {
                    tenant,
                    label: "Pacientes",
                    icon: <PatientIcon />,
                  },
                }, {
                  name: "services",
                  identifier: "vaccines",
                  list: "/:tenant/patient/:patient/vaccine",
                  create: "/:tenant/patient/:patient/vaccine/create",
                  edit: "/:tenant/patient/:patient/vaccine/edit/:id",
                  show: "/:tenant/patient/:patient/vaccine/show/:id",
                  meta: {
                    tenant,
                    patient,
                    hide: true,
                    icon: <VaccineIcon />,
                    label: "Vacunas",
                  },
                }, {
                  name: "services",
                  identifier: "antiparasithics",
                  list: "/:tenant/patient/:/antiparasithics",
                  create: "/:tenant/patient/:/antiparasithics/create",
                  edit: "/:tenant/patient/:/antiparasithics/edit/:id",
                  show: "/:tenant/patient/:/antiparasithics/show/:id",
                  meta: {
                    tenant,
                    patient,
                    icon: <AntiparasithicsIcon />,
                    label: "Antiparasitarios",
                  },
                }, {
                  name: "customers",
                  list: "/:tenant/customers",
                  show: "/:tenant/customers/show/:id",
                  meta: {
                    tenant
                  },
                }, {
                  name: "items",
                  list: "/:tenant/services",
                  create: "/:tenant/services/create",
                  edit: "/:tenant/services/edit/:id",
                  show: "/:tenant/services/show/:id",
                  meta: {
                    tenant,
                    label: "Servicios"
                  },
                }, {
                  name: "items",
                  list: "/:tenant/items",
                  create: "/:tenant/items/create",
                  edit: "/:tenant/items/edit/:id",
                  show: "/:tenant/items/show/:id",
                  meta: {
                    tenant,
                    label: "Productos"
                  },
                }, {
                  name: "species",
                  list: "/:tenant/species",
                  meta: {
                    tenant
                  },
                }, {
                  name: "breeds",
                  list: "/:tenant/breeds",
                  meta: {
                    hide: true,
                    tenant
                  },
                }, {
                  name: "orders",
                  list: "/:tenant/orders",
                  create: "/:tenant/orders/create",
                  edit: "/:tenant/orders/edit/:id",
                  show: "/:tenant/orders/show/:id",
                  meta: {
                    tenant,
                    label: "Ordenes"
                  },
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "vzPetm-SdXQTk-4w8dzT",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/tenant">
                      <Route index element={<TenantList />} />
                      <Route path="create" element={<TenantCreate />} />
                      <Route path="edit/:id" element={<TenantEdit />} />
                      <Route path="show/:id" element={<TenantShow />} />
                    </Route>
                    <Route path="/:tenant">
                      <Route path="patient">
                        <Route index element={<PatientsList />} />
                        <Route path=":patient" element={<PatientLayout>
                            <Outlet />
                          </PatientLayout>}
                        >
                          <Route index element={<PacientShow />} />
                          <Route path="vaccine">
                            <Route index element={<VaccinesList />} />
                          </Route>
                          <Route path="antiparasithics">
                            <Route index element={<AntiparasithicsList />} />
                          </Route>
                        </Route>
                      </Route>
                      <Route path="customers">
                        <Route index element={<CustomerList />} />
                      </Route>
                      <Route path="services">
                        <Route index element={<ServiceList />} />
                      </Route>
                      <Route path="items">
                        <Route index element={<ItemList />} />
                      </Route>
                      <Route path="orders">
                        <Route index element={<OrderList />} />
                        <Route path="create" element={<OrderEdit />} />
                        <Route path="edit/:id" element={<OrderEdit />} />
                        <Route path="show/:id" element={<OrderShow />} />
                      </Route>
                      <Route path="species">
                        <Route index element={<SpeciesList />} />
                      </Route>
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
