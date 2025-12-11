export type Message = {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: string;
  timestamp: string | Date;
};
