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