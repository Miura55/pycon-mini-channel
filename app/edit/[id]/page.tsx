import { notFound } from 'next/navigation';
import { getPost, updatePost } from '../../actions/posts';
import PostForm from '../../components/PostForm';
import Link from 'next/link';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPost(parseInt(id));

  if (!post) {
    notFound();
  }

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
            投稿を編集
          </h1>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <PostForm
            action={updatePost}
            post={post}
            submitLabel="更新する"
            cancelHref="/"
          />
        </main>
      </div>
    </div>
  );
}
