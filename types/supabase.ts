export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_channels: {
        Row: {
          channel_id: number
          channel_name: string | null
          created_at: string
          owner_id: string
        }
        Insert: {
          channel_id?: number
          channel_name?: string | null
          created_at?: string
          owner_id: string
        }
        Update: {
          channel_id?: number
          channel_name?: string | null
          created_at?: string
          owner_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          channel_id: number
          content: Json | null
          created_at: string
          message_id: number
          user_id: string
        }
        Insert: {
          channel_id: number
          content?: Json | null
          created_at?: string
          message_id?: number
          user_id: string
        }
        Update: {
          channel_id?: number
          content?: Json | null
          created_at?: string
          message_id?: number
          user_id?: string
        }
        Relationships: []
      }
      chat_subscribe: {
        Row: {
          channel_id: number
          chat_subscribe_id: number
          created_at: string
          user_id: string
        }
        Insert: {
          channel_id: number
          chat_subscribe_id?: number
          created_at?: string
          user_id: string
        }
        Update: {
          channel_id?: number
          chat_subscribe_id?: number
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          cost: number | null
          created_at: string
          detail_img: string | null
          end: string | null
          id: string
          main_img: string | null
          price: number | null
          product_count: number | null
          start: string | null
          text: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          cost?: number | null
          created_at?: string
          detail_img?: string | null
          end?: string | null
          id: string
          main_img?: string | null
          price?: number | null
          product_count?: number | null
          start?: string | null
          text?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          cost?: number | null
          created_at?: string
          detail_img?: string | null
          end?: string | null
          id?: string
          main_img?: string | null
          price?: number | null
          product_count?: number | null
          start?: string | null
          text?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          account_link: string | null
          address: string | null
          approve: boolean | null
          created_at: string
          email: string | null
          id: string
          nickname: string | null
          profile_url: string | null
          role: string | null
        }
        Insert: {
          account_link?: string | null
          address?: string | null
          approve?: boolean | null
          created_at?: string
          email?: string | null
          id: string
          nickname?: string | null
          profile_url?: string | null
          role?: string | null
        }
        Update: {
          account_link?: string | null
          address?: string | null
          approve?: boolean | null
          created_at?: string
          email?: string | null
          id?: string
          nickname?: string | null
          profile_url?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
