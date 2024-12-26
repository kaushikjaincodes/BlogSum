interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const users: User[] = [
  { id: 1, name: "Neveah" },
  { id: 2, name: "Hannah" },
];

const posts: Post[] = [
  { id: 1, title: "Post 1", body: "lorem ipsum 1", userId: 1 },
  { id: 2, title: "Post 2", body: "lorem ipsum 2", userId: 2 },
  { id: 3, title: "Post 3", body: "lorem ipsum 3", userId: 3 },
  { id: 4, title: "Post 4", body: "lorem ipsum 4", userId: 4 },
];

export const getPosts = async () => {
  return posts;
};

export const getPost = async (id: string | number) => {
  // return posts.find((post) => post.id === parseInt(id.toString()));
  const post = posts.find((post) => post.id === parseInt(id.toString()));
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }
  return post;
};

export const getUser = async (id: string | number) => {
  return users.find((user) => user.id === parseInt(id.toString()));
};
