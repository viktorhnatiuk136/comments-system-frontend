export interface Comment {
  id: number;
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  createdAt: string;
  parentId: number | null;
  replies: Comment[];
}
