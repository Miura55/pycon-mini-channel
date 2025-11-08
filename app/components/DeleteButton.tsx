'use client';

import { useState, useTransition } from 'react';
import { deletePost } from '@/app/actions/posts';

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePost(postId);
        setShowConfirm(false);
      } catch (error) {
        alert(error instanceof Error ? error.message : '削除に失敗しました');
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? '削除中...' : '削除する'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      削除
    </button>
  );
}
