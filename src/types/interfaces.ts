import { Tables } from "./supabase";



export interface IAppointment extends Tables<"appointments"> {
    doctor: Tables<"staff">;
    patient: Tables<"patients">;
}

export interface IIdentity {
    id: number;
    fullName: string;
    user_metadata: {
      tenant_id: string;
    };
  };