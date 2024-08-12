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
      cart: {
        Row: {
          amount: number
          created_at: string
          end: string | null
          id: number
          main_img: string
          name: string
          nickname: string
          product_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          end?: string | null
          id?: number
          main_img: string
          name: string
          nickname: string
          product_id: string
          quantity: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          end?: string | null
          id?: number
          main_img?: string
          name?: string
          nickname?: string
          product_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_amount_fkey"
            columns: ["amount"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["price"]
          },
          {
            foreignKeyName: "cart_main_img_fkey"
            columns: ["main_img"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["main_img"]
          },
          {
            foreignKeyName: "cart_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["title"]
          },
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_channels: {
        Row: {
          channel_id: number
          channel_name: string | null
          created_at: string
          last_time: string
          owner_id: string
          owner_profile_url: string | null
          update_data: string
        }
        Insert: {
          channel_id?: number
          channel_name?: string | null
          created_at?: string
          last_time?: string
          owner_id: string
          owner_profile_url?: string | null
          update_data?: string
        }
        Update: {
          channel_id?: number
          channel_name?: string | null
          created_at?: string
          last_time?: string
          owner_id?: string
          owner_profile_url?: string | null
          update_data?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_channels_channel_name_fkey"
            columns: ["channel_name"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["nickname"]
          },
        ]
      }
      chat_messages: {
        Row: {
          channel_id: number
          content: Json | null
          created_at: string
          message_id: number
          nickname: string | null
          user_id: string
        }
        Insert: {
          channel_id: number
          content?: Json | null
          created_at?: string
          message_id?: number
          nickname?: string | null
          user_id: string
        }
        Update: {
          channel_id?: number
          content?: Json | null
          created_at?: string
          message_id?: number
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "chat_channels"
            referencedColumns: ["channel_id"]
          },
          {
            foreignKeyName: "chat_messages_nickname_fkey"
            columns: ["nickname"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["nickname"]
          },
        ]
      }
      chat_subscribe: {
        Row: {
          channel_id: number
          chat_subscribe_id: number
          created_at: string
          last_time: string
          update_data: string
          user_id: string
        }
        Insert: {
          channel_id: number
          chat_subscribe_id?: number
          created_at?: string
          last_time?: string
          update_data?: string
          user_id: string
        }
        Update: {
          channel_id?: number
          chat_subscribe_id?: number
          created_at?: string
          last_time?: string
          update_data?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_subscribe_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "chat_channels"
            referencedColumns: ["channel_id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string
          id: string
          private: boolean | null
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          private?: boolean | null
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          private?: boolean | null
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          address: string | null
          created_at: string
          delivery: string | null
          name: string | null
          paymentId: string
          phoneNumber: number | null
          price: number
          product_list: Json[]
          request: string | null
          userId: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          delivery?: string | null
          name?: string | null
          paymentId: string
          phoneNumber?: number | null
          price: number
          product_list: Json[]
          request?: string | null
          userId: string
        }
        Update: {
          address?: string | null
          created_at?: string
          delivery?: string | null
          name?: string | null
          paymentId?: string
          phoneNumber?: number | null
          price?: number
          product_list?: Json[]
          request?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_review: {
        Row: {
          created_at: string
          id: string
          inf_name: string
          payment_id: string | null
          product_id: string | null
          review_content: string
          review_images: string[] | null
          review_score: number
          title: string | null
          user_nickname: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          inf_name: string
          payment_id?: string | null
          product_id?: string | null
          review_content: string
          review_images?: string[] | null
          review_score: number
          title?: string | null
          user_nickname?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          inf_name?: string
          payment_id?: string | null
          product_id?: string | null
          review_content?: string
          review_images?: string[] | null
          review_score?: number
          title?: string | null
          user_nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_review_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["paymentId"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          cost: number
          created_at: string
          detail_img: string[] | null
          end: string
          id: string
          main_img: string | null
          nickname: string | null
          price: number
          product_count: number | null
          start: string | null
          text: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          cost: number
          created_at?: string
          detail_img?: string[] | null
          end: string
          id: string
          main_img?: string | null
          nickname?: string | null
          price: number
          product_count?: number | null
          start?: string | null
          text?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          cost?: number
          created_at?: string
          detail_img?: string[] | null
          end?: string
          id?: string
          main_img?: string | null
          nickname?: string | null
          price?: number
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
      subscribe: {
        Row: {
          infuser_id: string
          user_id: string
        }
        Insert: {
          infuser_id: string
          user_id: string
        }
        Update: {
          infuser_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscribe_infuser_id_fkey"
            columns: ["infuser_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_user_id_fkey"
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
          intro: string | null
          name: string | null
          nickname: string
          phonenum: string | null
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
          intro?: string | null
          name?: string | null
          nickname: string
          phonenum?: string | null
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
          intro?: string | null
          name?: string | null
          nickname?: string
          phonenum?: string | null
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
