import Link from 'next/link';
import { getAllPosts } from './actions/posts';
import PostList from './components/PostList';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            掲示板アプリ
          </h1>
          <Link
            href="/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            新規投稿
          </Link>
        </header>

        <main>
          <PostList posts={posts} />
        </main>
      </div>
    </div>
  );
}
