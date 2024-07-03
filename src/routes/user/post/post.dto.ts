export type PostDto = {
    userId: string;
    postId: string;
    username: string;
    content: string;
    imageUrl: string;
    likes: number;
    reposts: number;
    comments: number;
    createdAt: Date;
    tags: string[];
};
  