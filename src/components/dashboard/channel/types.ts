export interface IChannel {
  id: number;
  name: string;
  description: string;
  channel_telegram_id: string;
  members_count: number;
  view: number;
  share: number;
  tags: string;
  user_id: number;
  channel_date_created: string;
  channel_date_updated: string;
  type?: string;
}
