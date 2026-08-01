export interface CreateCommentDto {
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  captchaId: string;
  captchaText: string;
  parentId?: number;
}
