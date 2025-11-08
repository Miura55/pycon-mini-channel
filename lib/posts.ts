import { promises as fs } from 'fs';
import path from 'path';
import { Post } from '@/types/post';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

export async function readPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // ファイルが存在しない場合は空配列を返す
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function writePosts(posts: Post[]): Promise<void> {
  try {
    // ディレクトリが存在しない場合は作成
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing posts:', error);
    throw new Error('投稿の保存に失敗しました');
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  const posts = await readPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getNextId(): Promise<number> {
  const posts = await readPosts();
  if (posts.length === 0) return 1;
  return Math.max(...posts.map(post => post.id)) + 1;
}
