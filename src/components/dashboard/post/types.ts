export interface IPost {
  id: number;
  details: string;
  view: number;
  share: number;
  type: number;
  tags: string;
  channel_id: number;
  created_at: string;
  updated_at?: string;
}
