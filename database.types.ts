export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      album: {
        Row: {
          artist_id: string
          cover_url: string | null
          embedding: string | null
          id: string
          release_date: string | null
          title: string
          type: string
        }
        Insert: {
          artist_id: string
          cover_url?: string | null
          embedding?: string | null
          id?: string
          release_date?: string | null
          title: string
          type?: string
        }
        Update: {
          artist_id?: string
          cover_url?: string | null
          embedding?: string | null
          id?: string
          release_date?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_album_artist"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
        ]
      }
      artist: {
        Row: {
          avatar_url: string | null
          bio: string | null
          embedding: string | null
          id: string
          name: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          embedding?: string | null
          id?: string
          name: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          embedding?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          id: number
          song_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          song_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          song_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      playlist_songs: {
        Row: {
          id: string
          playlist_id: string
          song_id: string | null
        }
        Insert: {
          id?: string
          playlist_id: string
          song_id?: string | null
        }
        Update: {
          id?: string
          playlist_id?: string
          song_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_song_id"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          created_at: string | null
          id: string
          is_public: boolean
          name: string
          playlist_cover: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean
          name: string
          playlist_cover?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean
          name?: string
          playlist_cover?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      recently_played_playlists: {
        Row: {
          id: number
          played_at: string | null
          playlist_id: string
          user_id: string
        }
        Insert: {
          id?: never
          played_at?: string | null
          playlist_id: string
          user_id: string
        }
        Update: {
          id?: never
          played_at?: string | null
          playlist_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_playlist_id"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      song: {
        Row: {
          album_id: string | null
          duration: number
          embedding: string | null
          id: string
          name: string
          play_count: number | null
          sege: number
          song_cover: string | null
          song_time_stamp: number[] | null
          url: string
        }
        Insert: {
          album_id?: string | null
          duration: number
          embedding?: string | null
          id?: string
          name: string
          play_count?: number | null
          sege: number
          song_cover?: string | null
          song_time_stamp?: number[] | null
          url: string
        }
        Update: {
          album_id?: string | null
          duration?: number
          embedding?: string | null
          id?: string
          name?: string
          play_count?: number | null
          sege?: number
          song_cover?: string | null
          song_time_stamp?: number[] | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
      }
      song_artists: {
        Row: {
          artist_id: string
          role: string
          song_id: string | null
        }
        Insert: {
          artist_id: string
          role: string
          song_id?: string | null
        }
        Update: {
          artist_id?: string
          role?: string
          song_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "song_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_artists_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reference_items: {
        Row: {
          created_at: string
          item_id: string
          item_type: Database["public"]["Enums"]["reference_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          item_id: string
          item_type: Database["public"]["Enums"]["reference_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          item_id?: string
          item_type?: Database["public"]["Enums"]["reference_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_reference_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_song_plays: {
        Row: {
          id: number
          played_at: string | null
          song: string | null
          user_id: string
        }
        Insert: {
          id?: never
          played_at?: string | null
          song?: string | null
          user_id: string
        }
        Update: {
          id?: never
          played_at?: string | null
          song?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_song"
            columns: ["song"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          user_email?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          user_email?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      weekly_playlist_play_counts: {
        Row: {
          play_count: number | null
          playlist_id: string
          week_start: string
        }
        Insert: {
          play_count?: number | null
          playlist_id: string
          week_start: string
        }
        Update: {
          play_count?: number | null
          playlist_id?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_weekly_song_song"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_song_play_counts: {
        Row: {
          play_count: number | null
          song: string | null
          week_start: string
        }
        Insert: {
          play_count?: number | null
          song?: string | null
          week_start: string
        }
        Update: {
          play_count?: number | null
          song?: string | null
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_weekly_song_song"
            columns: ["song"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_playlist_song: {
        Args: { p_id: string; s_id: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          might_repeat: boolean
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
          songs: Json[]
        }[]
      }
      add_recently_played_playlist: {
        Args: { p_playlist_id: string }
        Returns: undefined
      }
      add_to_library: {
        Args: {
          p_item_id: string
          p_item_type: Database["public"]["Enums"]["reference_type"]
        }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
        }[]
      }
      addlike: {
        Args: { song_id: string }
        Returns: undefined
      }
      delete_playlist_song: {
        Args: { p_id: string; s_id: string; uni_id: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          might_repeat: boolean
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
          songs: Json[]
        }[]
      }
      delete_user_playlist_item: {
        Args: { p_item_id: string }
        Returns: undefined
      }
      delete_user_reference_item: {
        Args: { refer_item_id: string }
        Returns: undefined
      }
      edit_playlist: {
        Args: { p_playlist_id: string; p_new_name: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
        }[]
      }
      get_album_songs_with_artists: {
        Args: { p_album_id: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          might_repeat: boolean
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
          songs: Json
        }[]
      }
      get_all_media_items: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
        }[]
      }
      get_liked_songs: {
        Args: { current_user_id: string }
        Returns: {
          id: number
          name: string
          url: string
          sege: number
          duration: number
          is_liked: boolean
        }[]
      }
      get_playlist_songs: {
        Args: { p_id: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          might_repeat: boolean
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
          songs: Json[]
        }[]
      }
      get_similar_songs: {
        Args:
          | { input_song_id: number; similarity_threshold: number }
          | { input_song_id: string; similarity_threshold: number }
        Returns: {
          id: number
          url: string
          sege: number
          name: string
          duration: number
          song_time_stamp: number[]
          is_liked: boolean
        }[]
      }
      get_similar_songs_exclude: {
        Args:
          | { input_song_id: number; similarity_threshold: number }
          | { input_song_id: string; similarity_threshold: number }
        Returns: {
          id: string
          url: string
          sege: number
          name: string
          duration: number
          song_time_stamp: number[]
          is_liked: boolean
        }[]
      }
      get_similar_songs_text: {
        Args: { input_song_text: string; similarity_threshold: number }
        Returns: {
          id: string
          url: string
          sege: number
          name: string
          duration: number
          song_time_stamp: number[]
          is_liked: boolean
        }[]
      }
      get_songs_with_likes: {
        Args: { current_user_id: string }
        Returns: {
          song_id: number
          is_liked: boolean
        }[]
      }
      get_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_library: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
        }[]
      }
      get_user_playlists: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
        }[]
      }
      insert_playlist: {
        Args: { playlist_name: string }
        Returns: {
          id: string
          name: string
          related_id: string
          related_name: string
          source: Database["public"]["Enums"]["media_source_type"]
          type: Database["public"]["Enums"]["media_item_type"]
        }[]
      }
      insert_playlist_with_songs: {
        Args: { playlist_name: string; song_ids: number[] }
        Returns: {
          id: string
          name: string
        }[]
      }
      insert_song_with_refs: {
        Args: {
          p_url: string
          p_sege: number
          p_name: string
          p_duration: number
          p_embedding: string
          p_song_time_stamp: number[]
          p_song_album: string
          p_song_cover: string
          p_artists: Json
        }
        Returns: string
      }
      is_playlist_owner: {
        Args: { playlist_id: string }
        Returns: boolean
      }
      is_playlist_public: {
        Args: { playlist_id: string }
        Returns: boolean
      }
      removelike: {
        Args: { song_id: string }
        Returns: undefined
      }
      search_songs: {
        Args: { query: string }
        Returns: {
          id: string
          name: string
        }[]
      }
    }
    Enums: {
      media_item_type: "playlist" | "album" | "artist"
      media_source_type: "create" | "reference" | "none"
      reference_type: "playlist" | "artist" | "album"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      media_item_type: ["playlist", "album", "artist"],
      media_source_type: ["create", "reference", "none"],
      reference_type: ["playlist", "artist", "album"],
    },
  },
} as const
