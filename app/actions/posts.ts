'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Post } from '@/types/post';
import { 
  entriesGetEntries, 
  entriesCreateEntry, 
  entriesUpdateEntry, 
  entriesDeleteEntry 
} from '@/api';
import type { Entry } from '@/api';

// Entry型からPost型への変換
function entryToPost(entry: Entry): Post {
  return {
    id: entry.id ?? 0,
    title: entry.title ?? '',
    content: entry.content ?? '',
    user_name: entry.user_name ?? '',
    created_at: entry.created_at ?? '',
    updated_at: entry.updated_at ?? '',
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const response = await entriesGetEntries();
  
  if (!response.data) {
    return [];
  }
  
  const posts = response.data.map(entryToPost);
  
  // created_atの降順でソート
  return posts.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getPost(id: number): Promise<Post | null> {
  const response = await entriesGetEntries();
  
  if (!response.data) {
    return null;
  }
  
  const entry = response.data.find(e => e.id === id);
  return entry ? entryToPost(entry) : null;
}

export async function createPost(prevState: unknown, formData: FormData) {
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

  // APIを使用して投稿を作成
  const response = await entriesCreateEntry({
    body: {
      title: title.trim(),
      content: content.trim(),
      user_name: user_name.trim(),
    },
  });

  if (!response.data) {
    throw new Error('投稿の作成に失敗しました');
  }

  revalidatePath('/');
  redirect('/');
}

export async function updatePost(prevState: unknown, formData: FormData) {
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

  // APIを使用して投稿を更新
  const response = await entriesUpdateEntry({
    path: {
      entry_id: id,
    },
    body: {
      title: title.trim(),
      content: content.trim(),
      user_name: user_name.trim(),
    },
  });

  if (!response.data) {
    throw new Error('投稿の更新に失敗しました');
  }

  revalidatePath('/');
  revalidatePath(`/edit/${id}`);
  redirect('/');
}

export async function deletePost(id: number) {
  // APIを使用して投稿を削除
  const response = await entriesDeleteEntry({
    path: {
      entry_id: id,
    },
  });

  if (!response.data) {
    throw new Error('投稿の削除に失敗しました');
  }

  revalidatePath('/');
}
