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
      bot_analytics: {
        Row: {
          command: string | null
          created_at: string | null
          data: Json | null
          event_type: string
          id: string
          message_length: number | null
          personality: string | null
          response_time_ms: number | null
          telegram_user_id: string | null
        }
        Insert: {
          command?: string | null
          created_at?: string | null
          data?: Json | null
          event_type: string
          id?: string
          message_length?: number | null
          personality?: string | null
          response_time_ms?: number | null
          telegram_user_id?: string | null
        }
        Update: {
          command?: string | null
          created_at?: string | null
          data?: Json | null
          event_type?: string
          id?: string
          message_length?: number | null
          personality?: string | null
          response_time_ms?: number | null
          telegram_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_analytics_telegram_user_id_fkey"
            columns: ["telegram_user_id"]
            isOneToOne: false
            referencedRelation: "telegram_users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          current_personality: string | null
          id: string
          last_message: string | null
          message_count: number | null
          session_start: string | null
          telegram_user_id: string | null
        }
        Insert: {
          current_personality?: string | null
          id?: string
          last_message?: string | null
          message_count?: number | null
          session_start?: string | null
          telegram_user_id?: string | null
        }
        Update: {
          current_personality?: string | null
          id?: string
          last_message?: string | null
          message_count?: number | null
          session_start?: string | null
          telegram_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_telegram_user_id_fkey"
            columns: ["telegram_user_id"]
            isOneToOne: false
            referencedRelation: "telegram_users"
            referencedColumns: ["id"]
          },
        ]
      }
      content_purchases: {
        Row: {
          buyer_id: string
          content_id: string
          id: string
          price_paid: number
          purchase_date: string | null
          transaction_id: string | null
        }
        Insert: {
          buyer_id: string
          content_id: string
          id?: string
          price_paid: number
          purchase_date?: string | null
          transaction_id?: string | null
        }
        Update: {
          buyer_id?: string
          content_id?: string
          id?: string
          price_paid?: number
          purchase_date?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_purchases_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_purchases_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "creator_content"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_content: {
        Row: {
          content_type: string
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          media_url: string | null
          price: number
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_type?: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          media_url?: string | null
          price?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          media_url?: string | null
          price?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content_text: string | null
          created_at: string | null
          creator_id: string
          id: string
          is_premium: boolean | null
          media_urls: string[] | null
          price: number | null
          updated_at: string | null
        }
        Insert: {
          content_text?: string | null
          created_at?: string | null
          creator_id: string
          id?: string
          is_premium?: boolean | null
          media_urls?: string[] | null
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          content_text?: string | null
          created_at?: string | null
          creator_id?: string
          id?: string
          is_premium?: boolean | null
          media_urls?: string[] | null
          price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string
          id: string
          is_creator: boolean | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name: string
          id: string
          is_creator?: boolean | null
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          is_creator?: boolean | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string | null
          creator_id: string
          currency: string
          end_date: string
          id: string
          start_date: string | null
          status: string
          subscriber_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          creator_id: string
          currency?: string
          end_date: string
          id?: string
          start_date?: string | null
          status: string
          subscriber_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          creator_id?: string
          currency?: string
          end_date?: string
          id?: string
          start_date?: string | null
          status?: string
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_users: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_active: string | null
          last_name: string | null
          preferred_personality: string | null
          telegram_id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_active?: string | null
          last_name?: string | null
          preferred_personality?: string | null
          telegram_id: number
          username?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_active?: string | null
          last_name?: string | null
          preferred_personality?: string | null
          telegram_id?: number
          username?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: string
          currency: string
          date: string | null
          id: string
          status: string | null
          to_user_id: string | null
          tx_hash: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: string
          currency?: string
          date?: string | null
          id?: string
          status?: string | null
          to_user_id?: string | null
          tx_hash?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: string
          currency?: string
          date?: string | null
          id?: string
          status?: string | null
          to_user_id?: string | null
          tx_hash?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
