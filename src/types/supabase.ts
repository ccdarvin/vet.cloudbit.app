export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      appointments: {
        Row: {
          created_at: string
          date: string | null
          id: string
          is_visit: boolean | null
          patient_id: string | null
          reason: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          is_visit?: boolean | null
          patient_id?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          is_visit?: boolean | null
          patient_id?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      breeds: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          species_id: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          species_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          species_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "breeds_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeds_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      cashboxes: {
        Row: {
          closed_at: string | null
          created_at: string
          created_by: string | null
          id: string
          initial_balance: number | null
          number: number | null
          open_at: string
          status: Database["public"]["Enums"]["cashbox_status"]
          tenant_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          initial_balance?: number | null
          number?: number | null
          open_at: string
          status?: Database["public"]["Enums"]["cashbox_status"]
          tenant_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          initial_balance?: number | null
          number?: number | null
          open_at?: string
          status?: Database["public"]["Enums"]["cashbox_status"]
          tenant_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cashboxes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashboxes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashboxes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          address: string | null
          address_ref: string | null
          created_at: string
          created_by: string | null
          doc_number: string | null
          doc_type_id: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          tenant_id: string
          title_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          address_ref?: string | null
          created_at?: string
          created_by?: string | null
          doc_number?: string | null
          doc_type_id?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          tenant_id: string
          title_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          address_ref?: string | null
          created_at?: string
          created_by?: string | null
          doc_number?: string | null
          doc_type_id?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          tenant_id?: string
          title_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      items: {
        Row: {
          cost: number | null
          created_at: string
          created_by: string | null
          description: string | null
          duration: number | null
          ean: string | null
          id: string
          image_url: string | null
          instructions: string | null
          is_service: boolean | null
          name: string
          price: number | null
          price_without_taxes: number | null
          sku: string | null
          stock: number | null
          tax_rate: number | null
          tenant_id: string | null
          type: string | null
          units_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: number | null
          ean?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          is_service?: boolean | null
          name: string
          price?: number | null
          price_without_taxes?: number | null
          sku?: string | null
          stock?: number | null
          tax_rate?: number | null
          tenant_id?: string | null
          type?: string | null
          units_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: number | null
          ean?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          is_service?: boolean | null
          name?: string
          price?: number | null
          price_without_taxes?: number | null
          sku?: string | null
          stock?: number | null
          tax_rate?: number | null
          tenant_id?: string | null
          type?: string | null
          units_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          created_at: string
          created_by: string | null
          discount: number | null
          id: string
          item_id: string | null
          order_id: string
          quantity: number | null
          subtotal: number | null
          tenant_id: string | null
          unit_price: number | null
          unit_price_base: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          discount?: number | null
          id?: string
          item_id?: string | null
          order_id: string
          quantity?: number | null
          subtotal?: number | null
          tenant_id?: string | null
          unit_price?: number | null
          unit_price_base?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          discount?: number | null
          id?: string
          item_id?: string | null
          order_id?: string
          quantity?: number | null
          subtotal?: number | null
          tenant_id?: string | null
          unit_price?: number | null
          unit_price_base?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string
          discount: number | null
          id: string
          number: number
          subtotal_base: number | null
          tenant_id: string | null
          total: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id: string
          discount?: number | null
          id?: string
          number: number
          subtotal_base?: number | null
          tenant_id?: string | null
          total?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string
          discount?: number | null
          id?: string
          number?: number
          subtotal_base?: number | null
          tenant_id?: string | null
          total?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patients: {
        Row: {
          aggressiveness: number | null
          birthday: string | null
          breed_id: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          is_castrated: boolean | null
          is_dead: boolean | null
          last_heat: string | null
          meal: string | null
          name: string
          observations: string | null
          sex: Database["public"]["Enums"]["patient_sex"] | null
          species_id: string | null
          tenant_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          aggressiveness?: number | null
          birthday?: string | null
          breed_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          is_castrated?: boolean | null
          is_dead?: boolean | null
          last_heat?: string | null
          meal?: string | null
          name: string
          observations?: string | null
          sex?: Database["public"]["Enums"]["patient_sex"] | null
          species_id?: string | null
          tenant_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          aggressiveness?: number | null
          birthday?: string | null
          breed_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          is_castrated?: boolean | null
          is_dead?: boolean | null
          last_heat?: string | null
          meal?: string | null
          name?: string
          observations?: string | null
          sex?: Database["public"]["Enums"]["patient_sex"] | null
          species_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          created_at: string
          date: string | null
          id: number
          is_done: boolean | null
          name: string | null
          observations: string | null
          patient_id: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          is_done?: boolean | null
          name?: string | null
          observations?: string | null
          patient_id: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          is_done?: boolean | null
          name?: string | null
          observations?: string | null
          patient_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      species: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "species_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      staff: {
        Row: {
          " email": string | null
          created_at: string
          first_name: string | null
          id: string
          is_doctor: boolean | null
          last_name: string | null
          phone: string | null
          tenant_id: string
        }
        Insert: {
          " email"?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_doctor?: boolean | null
          last_name?: string | null
          phone?: string | null
          tenant_id: string
        }
        Update: {
          " email"?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_doctor?: boolean | null
          last_name?: string | null
          phone?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          address_ref: string | null
          created_at: string
          created_by: string | null
          email: string | null
          first_name: string | null
          id: string
          is_company: boolean | null
          last_name: string | null
          name: string | null
          phone: string | null
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          address_ref?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_company?: boolean | null
          last_name?: string | null
          name?: string | null
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          address_ref?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_company?: boolean | null
          last_name?: string | null
          name?: string | null
          phone?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suppliers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suppliers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tenants: {
        Row: {
          color: string | null
          country_code: string | null
          created_at: string
          created_by: string | null
          currency_code: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          color?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          color?: string | null
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      next_number: {
        Args: {
          in_tenant_id: string
          in_table_name: string
        }
        Returns: number
      }
    }
    Enums: {
      appointment_status:
        | "Pending"
        | "Confirmed"
        | "InProcess"
        | "Completed"
        | "Cancelled"
        | "NoShow"
      cashbox_status: "open" | "closed"
      patient_sex: "F" | "M"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
