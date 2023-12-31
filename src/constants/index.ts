interface AppointmentStatusOption {
  value: string;
  color: string;
}

export const appointmentStatusOptions: AppointmentStatusOption[] = [
  {
    value: "Pending",
    color: "#808080",
  },
  {
    value: "Confirmed",
    color: "#ADD8E6",
  },
  {
    value: "InProcess",
    color: "#0000FF",
  },
  {
    value: "Completed",
    color: "#006400",
  },
  {
    value: "Cancelled",
    color: "#FF0000",
  },
  {
    value: "NoShow",
    color: "#800080",
  },
];

/**
 * :
Cash: Pagos en efectivo.
Card: Pagos con tarjeta.
App: Pagos a través de aplicaciones.
Wire: Transferencias bancarias.
other: Pagos con cheques.
 */
export const paymentMethodOptions: { value: string, color: string }[] = [
  {
    value: "Cash",
    color: "#808080",
  },
  {
    value: "Card",
    color: "#ADD8E6",
  },
  {
    value: "App",
    color: "#0000FF",
  },
  {
    value: "Wire",
    color: "#006400",
  },
  {
    value: "other",
    color: "#FF0000",
  },
];

export const OrderStatusOptions: { value: string, step: number }[] = [
  {
    value: "Pend",
    step: 0,
  },
  {
    value: "Comp",
    step: 1,
  },
  {
    value: "Paid",
    step: 2,
  },
  {
    value: "Canc",
    step: 3,
  },
];