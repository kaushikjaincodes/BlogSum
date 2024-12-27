import { supabase } from './supabaseClient'
import { unstable_noStore as noStore } from 'next/cache';
// interface User {
//   id: string;
//   username: string;
//   email: string;
// }

// interface Post {
//   id: string
//   created_at: string
//   updated_at: string
//   title: string
//   desc: string
//   img: string
//   userId: string  // Changed from number to string
//   slug: string
// }

// const users: User[] = [
//   { id: 1, name: "Neveah" },
//   { id: 2, name: "Hannah" },
// ];

// const posts: Post[] = [
//   { id: 1, title: "Post 1", body: "lorem ipsum 1", userId: 1 },
//   { id: 2, title: "Post 2", body: "lorem ipsum 2", userId: 2 },
//   { id: 3, title: "Post 3", body: "lorem ipsum 3", userId: 3 },
//   { id: 4, title: "Post 4", body: "lorem ipsum 4", userId: 4 },
// ];

// export const getPosts = async () => {
//   return posts;
// };

// export const getPost = async (id: string | number) => {
//   // return posts.find((post) => post.id === parseInt(id.toString()));
//   const post = posts.find((post) => post.id === parseInt(id.toString()));
//   if (!post) {
//     throw new Error(`Post with id ${id} not found`);
//   }
//   return post;
// };

// export const getUser = async (id: string | number) => {
//   return users.find((user) => user.id === parseInt(id.toString()));
// };

export const getPosts = async () => {
  try {
    console.log('Fetching posts...');
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*');

    console.log('Posts response:', posts);  // See what we're getting back
    console.log('Error if any:', error);    // See if there are any errors

    if (error) {
      throw error;
    }

    return posts;
  } catch (err) {
    console.log('Detailed error:', err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug: string) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw error;
    }

    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }

    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id: string | number) => {
  noStore();
  try {
    console.log('Fetching user with ID:', id);
    
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id,
        username,
        img
      `)
      .eq('id', id.toString())
      .single();

    console.log('Query result:', { user, error });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return user;
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw error;
    }

    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
