'use client';

import { useActionState } from 'react';
import { Post } from '@/types/post';

type ActionFunction = (prevState: unknown, formData: FormData) => Promise<void>;

interface PostFormProps {
  action: ActionFunction | ((formData: FormData) => Promise<void>);
  post?: Post;
  submitLabel: string;
  cancelHref: string;
}

export default function PostForm({ action, post, submitLabel, cancelHref }: PostFormProps) {
  // action関数を useActionState用にラップ
  const wrappedAction = async (prevState: unknown, formData: FormData) => {
    if (action.length === 1) {
      // action が FormData のみを受け取る場合
      await (action as (formData: FormData) => Promise<void>)(formData);
    } else {
      // action が prevState と FormData を受け取る場合
      await (action as ActionFunction)(prevState, formData);
    }
  };

  const [, formAction, isPending] = useActionState(wrappedAction, null);

  return (
    <form action={formAction} className="space-y-6">
      {post && (
        <input type="hidden" name="id" value={post.id} />
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post?.title}
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="投稿のタイトルを入力"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">最大100文字</p>
      </div>

      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          投稿者名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          defaultValue={post?.user_name}
          required
          maxLength={50}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="あなたの名前を入力"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">最大50文字</p>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          投稿内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post?.content}
          required
          maxLength={1000}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-vertical"
          placeholder="投稿の内容を入力"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">最大1000文字</p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? '送信中...' : submitLabel}
        </button>
        <a
          href={cancelHref}
          className="flex-1 px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 text-center transition-colors"
        >
          キャンセル
        </a>
      </div>
    </form>
  );
}
