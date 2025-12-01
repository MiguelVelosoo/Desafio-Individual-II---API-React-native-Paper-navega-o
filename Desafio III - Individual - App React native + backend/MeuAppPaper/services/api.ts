export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch(`${API_BASE}/posts`);
    return res.json();
  },
};
