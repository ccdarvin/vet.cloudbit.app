import { Tables } from "./supabase";



export interface IAppointment extends Tables<"appointments"> {
    doctor: Tables<"staff">;
    patient: Tables<"patients">;
}