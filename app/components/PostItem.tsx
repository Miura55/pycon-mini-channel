import { Post } from '@/types/post';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

interface PostItemProps {
  post: Post;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function PostItem({ post }: PostItemProps) {
  const isUpdated = post.created_at !== post.updated_at;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h2>
        <div className="flex gap-2">
          <Link
            href={`/edit/${post.id}`}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            編集
          </Link>
          <DeleteButton postId={post.id} />
        </div>
      </div>

      <div className="mb-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          投稿者: <span className="font-medium">{post.user_name}</span>
        </span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <div>作成: {formatDate(post.created_at)}</div>
        {isUpdated && (
          <div>更新: {formatDate(post.updated_at)}</div>
        )}
      </div>
    </article>
  );
}
