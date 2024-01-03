import { Authenticated, Refine, useParsed } from "@refinedev/core";
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
import {
  TenantCreate,
  TenantEdit,
  TenantList,
  TenantShow,
} from "./pages/tenants";
import { PatientsList, PacientShow, PatientLayout } from "./pages/patients";
import { SpeciesList } from "./pages/species";
import { CustomerList, CustomersShow } from "./pages/customers";
import { ItemList } from "./pages/items";
import { OrderEdit, OrderList, OrderShow } from "./pages/orders";
import {
  AppointmentIcon,
  CashRegisterIcon,
  CustomerIcon,
  ItemIcon,
  MedicalRecordIcon,
  NoteIcon,
  OrderIcon,
  PatientIcon,
  PaymentIcon,
  PaymentTypeIcon,
  SalesIcon,
  SettingsIcon,
  SpeciesIcon,
  StaffIcon,
  TreatmentTypeIcon,
  VisitIcon,
} from "./components/icons";
import { AppointmentsList } from "./pages/appointments";
import { StaffList } from "./pages/staff";
import { MedicalRecordsList } from "./pages/medical_records";
import { TreatmentTypesList } from "./pages/treatment_types";
import { PatientsNotesList } from "./pages/patients/notes";
import { CustomerLayout } from "./pages/customers/layout";
import { PaymentTypesList } from "./pages/payment_types";
import { CashRegistersList } from "./pages/cash_registers";
import { PaymentsList } from "./pages/payments";
import { TenantProvider } from "./contexts/TenantProvider";
import { IndexPage } from "./pages";

function App() {
  const { t, i18n } = useTranslation(["common"]);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const { params } = useParsed<{
    tenant: string;
    patient: string;
    customer: string;
  }>();
  console.log(params);
  const tenant = params?.tenant;
  const customer = params?.customer;
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
                resources={[
                  {
                    name: "tenants",
                    list: "/tenants",
                    create: "/tenants/create",
                    edit: "/tenants/edit/:id",
                    show: "/tenants/show/:id",
                  },
                  {
                    name: "appointments",
                    list: "/:tenant/appointments",
                    meta: {
                      icon: <AppointmentIcon />,
                      tenant,
                      label: "Citas",
                    },
                  },
                  {
                    name: "patients",
                    list: "/:tenant/patients",
                    show: "/:tenant/patients/:id",
                    meta: {
                      tenant,
                      param: "patient",
                      label: "Pacientes",
                      icon: <PatientIcon />,
                    },
                  },
                  {
                    name: "appointments",
                    identifier: "appointmentsByPatient",
                    list: "/:tenant/patients/:patient/appointments",
                    meta: {
                      icon: <AppointmentIcon />,
                      tenant,
                      label: "Citas",
                      hide: true,
                    },
                  },
                  {
                    name: "appointments",
                    identifier: "visits",
                    list: "/:tenant/patients/:patient/visits",
                    meta: {
                      icon: <VisitIcon />,
                      tenant,
                      label: "Visitas",
                      hide: true,
                    },
                  },
                  {
                    name: "medical_records",
                    list: "/:tenant/patients/:patient/medical_records",
                    create: "/:tenant/patients/:patient/medical_records/create",
                    show: "/:tenant/patients/:patient/medical_records/show/:id",
                    meta: {
                      tenant,
                      label: "Historia clínica",
                      icon: <MedicalRecordIcon />,
                      hide: true,
                    },
                  },
                  {
                    name: "notes",
                    list: "/:tenant/patients/:patient/notes",
                    create: "/:tenant/patients/:patient/notes/create",
                    meta: {
                      hide: true,
                      tenant,
                      label: "Notas",
                      icon: <NoteIcon />,
                    },
                  },
                  {
                    name: "customers",
                    list: "/:tenant/customers",
                    show: "/:tenant/customers/:id",
                    meta: {
                      param: "customer",
                      tenant,
                      label: "Clientes",
                      icon: <CustomerIcon />,
                    },
                  },
                  {
                    name: "patients",
                    identifier: "pets",
                    list: "/:tenant/customers/:customer/patients",
                    show: "/:tenant/patients/:id",
                    meta: {
                      tenant,
                      hide: true,
                      label: "Mascotas",
                      icon: <PatientIcon />,
                    },
                  },
                  {
                    name: "items",
                    list: "/:tenant/items",
                    create: "/:tenant/items/create",
                    edit: "/:tenant/items/edit/:id",
                    show: "/:tenant/items/show/:id",
                    meta: {
                      tenant,
                      icon: <ItemIcon />,
                      label: "Productos y Servicios",
                    },
                  },
                  {
                    name: "sales",
                    meta: {
                      tenant,
                      label: "Ventas",
                      icon: <SalesIcon />,
                    },
                  },
                  {
                    name: "orders",
                    list: "/:tenant/orders",
                    create: "/:tenant/orders/create",
                    edit: "/:tenant/orders/edit/:id",
                    show: "/:tenant/orders/show/:id",
                    meta: {
                      tenant,
                      label: "Ordenes",
                      parent: "sales",
                      icon: <OrderIcon />,
                    },
                  },
                  {
                    name: "cash_registers",
                    list: "/:tenant/cash_registers",
                    create: "/:tenant/cash_registers/create",
                    edit: "/:tenant/cash_registers/edit/:id",
                    show: "/:tenant/cash_registers/show/:id",
                    meta: {
                      tenant,
                      label: "Cajas",
                      parent: "sales",
                      icon: <CashRegisterIcon />,
                    },
                  },
                  {
                    name: "payments",
                    list: "/:tenant/payments",
                    create: "/:tenant/payments/create",
                    edit: "/:tenant/payments/edit/:id",
                    show: "/:tenant/payments/show/:id",
                    meta: {
                      tenant,
                      label: "Pagos",
                      parent: "sales",
                      icon: <PaymentIcon />,
                    },
                  },
                  {
                    name: "settings",
                    meta: {
                      tenant,
                      label: "Configuración",
                      icon: <SettingsIcon />,
                    },
                  },
                  {
                    name: "staff",
                    list: "/:tenant/staff",
                    create: "/:tenant/staff/create",
                    edit: "/staff/edit/:id",
                    show: "/staff/show/:id",
                    meta: {
                      tenant,
                      parent: "settings",
                      label: "Personal",
                      icon: <StaffIcon />,
                    },
                  },
                  {
                    name: "species",
                    list: "/:tenant/species",
                    meta: {
                      tenant,
                      parent: "settings",
                      label: "Especies",
                      icon: <SpeciesIcon />,
                    },
                  },
                  {
                    name: "breeds",
                    list: "/:tenant/breeds",
                    meta: {
                      hide: true,
                      parent: "settings",
                      tenant,
                    },
                  },
                  {
                    name: "treatment_types",
                    list: "/:tenant/treatment_types",
                    meta: {
                      tenant,
                      parent: "settings",
                      label: "Tipos de tratamiento",
                      icon: <TreatmentTypeIcon />,
                    },
                  },
                  {
                    name: "payment_types",
                    list: "/:tenant/payment_types",
                    meta: {
                      tenant,
                      parent: "settings",
                      label: "Tipos de pago",
                      icon: <PaymentTypeIcon />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "vzPetm-SdXQTk-4w8dzT",
                }}
              >
                <TenantProvider>
                  <Routes>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2
                            Header={() => <Header sticky />}
                            Sider={(props) => (
                              <ThemedSiderV2 {...props} fixed />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        index
                        element={<IndexPage />}
                      />
                      <Route path="/tenants">
                        <Route index element={<TenantList />} />
                        <Route path="create" element={<TenantCreate />} />
                        <Route path="edit/:id" element={<TenantEdit />} />
                        <Route path="show/:id" element={<TenantShow />} />
                      </Route>
                      <Route path="/:tenant">
                        <Route index element={<div >hello </div>} />
                        <Route path="patients">
                          <Route index element={<PatientsList />} />
                          <Route
                            path=":patient"
                            element={
                              <PatientLayout>
                                <Outlet />
                              </PatientLayout>
                            }
                          >
                            <Route index element={<PacientShow />} />
                            <Route path="appointments">
                              <Route index element={<AppointmentsList />} />
                            </Route>
                            <Route path="visits">
                              <Route index element={<AppointmentsList />} />
                            </Route>
                            <Route path="medical_records">
                              <Route index element={<MedicalRecordsList />} />
                            </Route>
                            <Route path="notes">
                              <Route index element={<PatientsNotesList />} />
                            </Route>
                          </Route>
                        </Route>
                        <Route path="customers">
                          <Route index element={<CustomerList />} />
                          <Route
                            path=":customer"
                            element={
                              <CustomerLayout>
                                <Outlet />
                              </CustomerLayout>
                            }
                          >
                            <Route path="patients">
                              <Route index element={<PatientsList />} />
                            </Route>
                            <Route index element={<CustomersShow />} />
                          </Route>
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
                        <Route path="cash_registers">
                          <Route index element={<CashRegistersList />} />
                          <Route path="edit/:id" element={<OrderEdit />} />
                        </Route>
                        <Route path="payments">
                          <Route index element={<PaymentsList />} />
                        </Route>
                        <Route path="species">
                          <Route index element={<SpeciesList />} />
                        </Route>
                        <Route path="appointments">
                          <Route index element={<AppointmentsList />} />
                        </Route>
                        <Route path="staff">
                          <Route index element={<StaffList />} />
                        </Route>
                        <Route path="treatment_types">
                          <Route index element={<TreatmentTypesList />} />
                        </Route>
                        <Route
                          path="payment_types"
                          element={<PaymentTypesList />}
                        />
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
                        element={<AuthPage type="login" formProps={{}} />}
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
                </TenantProvider>
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
