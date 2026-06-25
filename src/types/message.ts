export interface IMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  repliedAt?: Date;
  replyMessage?: string;
  createdAt: Date;
}
