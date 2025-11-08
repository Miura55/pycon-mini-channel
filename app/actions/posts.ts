'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Post } from '@/types/post';
import { readPosts, writePosts, getPostById, getNextId } from '@/lib/posts';

export async function getAllPosts(): Promise<Post[]> {
  const posts = await readPosts();
  // created_atの降順でソート
  return posts.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getPost(id: number): Promise<Post | null> {
  return await getPostById(id);
}

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const user_name = formData.get('user_name') as string;

  // バリデーション
  if (!title?.trim() || !content?.trim() || !user_name?.trim()) {
    throw new Error('すべての項目を入力してください');
  }

  if (title.length > 100) {
    throw new Error('タイトルは100文字以内で入力してください');
  }

  if (user_name.length > 50) {
    throw new Error('投稿者名は50文字以内で入力してください');
  }

  if (content.length > 1000) {
    throw new Error('投稿内容は1000文字以内で入力してください');
  }

  const posts = await readPosts();
  const id = await getNextId();
  const now = new Date().toISOString();

  const newPost: Post = {
    id,
    title: title.trim(),
    content: content.trim(),
    user_name: user_name.trim(),
    created_at: now,
    updated_at: now,
  };

  posts.push(newPost);
  await writePosts(posts);

  revalidatePath('/');
  redirect('/');
}

export async function updatePost(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const user_name = formData.get('user_name') as string;

  // バリデーション
  if (!title?.trim() || !content?.trim() || !user_name?.trim()) {
    throw new Error('すべての項目を入力してください');
  }

  if (title.length > 100) {
    throw new Error('タイトルは100文字以内で入力してください');
  }

  if (user_name.length > 50) {
    throw new Error('投稿者名は50文字以内で入力してください');
  }

  if (content.length > 1000) {
    throw new Error('投稿内容は1000文字以内で入力してください');
  }

  const posts = await readPosts();
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    throw new Error('投稿が見つかりません');
  }

  const updatedPost: Post = {
    ...posts[postIndex],
    title: title.trim(),
    content: content.trim(),
    user_name: user_name.trim(),
    updated_at: new Date().toISOString(),
  };

  posts[postIndex] = updatedPost;
  await writePosts(posts);

  revalidatePath('/');
  revalidatePath(`/edit/${id}`);
  redirect('/');
}

export async function deletePost(id: number) {
  const posts = await readPosts();
  const filteredPosts = posts.filter(p => p.id !== id);

  if (posts.length === filteredPosts.length) {
    throw new Error('投稿が見つかりません');
  }

  await writePosts(filteredPosts);
  revalidatePath('/');
}
