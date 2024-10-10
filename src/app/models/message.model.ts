export interface Message {
  _id: string;
  sender: string;
  content: string;
  channel: string;
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
}
