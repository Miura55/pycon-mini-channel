import { createPost } from '../actions/posts';
import PostForm from '../components/PostForm';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← 投稿一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            新規投稿
          </h1>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <PostForm
            action={createPost}
            submitLabel="投稿する"
            cancelHref="/"
          />
        </main>
      </div>
    </div>
  );
}
