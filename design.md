# 掲示板アプリケーション仕様書

## 概要
Next.js (App Router) とTypeScriptを使用した、シンプルなリアルタイム掲示板アプリケーションを構築します。

## 技術スタック
- **フロントエンド**: Next.js 16.0.1 (App Router), React 19.2.0, TypeScript
- **スタイリング**: Tailwind CSS v4
- **データ管理**: React Server Components + Server Actions
- **データ永続化**: JSON ファイル (初期実装) / 将来的にはデータベース移行可能

## 機能要件

### 1. 投稿一覧表示
- すべての投稿をタイムスタンプの降順で表示
- 各投稿には以下の情報を含む:
  - タイトル
  - 投稿者名 (user_name)
  - 投稿内容
  - 作成日時 (created_at)
  - 更新日時 (updated_at)
  - 投稿ID

### 2. 新規投稿機能
- 投稿フォームの項目:
  - タイトル (必須、最大100文字)
  - 投稿者名 (必須、最大50文字)
  - 投稿内容 (必須、最大1000文字)
- バリデーション:
  - 空白のみの投稿は不可
  - 文字数制限の実施
- 投稿後、一覧画面にリダイレクト

### 3. 投稿編集機能
- 各投稿に編集ボタンを配置
- 既存の内容を事前入力したフォームを表示
- 編集時に `updated_at` を更新
- 保存後、一覧画面にリダイレクト

### 4. 投稿削除機能
- 各投稿に削除ボタンを配置
- 削除確認ダイアログを表示
- 削除後、一覧を更新

## ディレクトリ構造

```
app/
├── layout.tsx               # 既存のルートレイアウト
├── page.tsx                 # トップページ (投稿一覧)
├── new/
│   └── page.tsx            # 新規投稿ページ
├── edit/
│   └── [id]/
│       └── page.tsx        # 投稿編集ページ
├── actions/
│   └── posts.ts            # Server Actions (CRUD操作)
└── components/
    ├── PostList.tsx        # 投稿一覧コンポーネント
    ├── PostItem.tsx        # 投稿アイテムコンポーネント
    ├── PostForm.tsx        # 投稿フォームコンポーネント
    ├── DeleteButton.tsx    # 削除ボタンコンポーネント
    └── EditButton.tsx      # 編集ボタンコンポーネント

lib/
└── posts.ts                # データアクセス層

types/
└── post.ts                 # 型定義

data/
└── posts.json              # データストア (初期実装)
```

## データモデル

```typescript
// types/post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  user_name: string;
  created_at: string; // ISO 8601形式 "2025-11-08T11:04:54.102607"
  updated_at: string; // ISO 8601形式 "2025-11-08T11:04:54.102610"
}

export interface CreatePostInput {
  title: string;
  content: string;
  user_name: string;
}

export interface UpdatePostInput {
  id: number;
  title: string;
  content: string;
  user_name: string;
}
```

## 画面設計

### トップページ (app/page.tsx)
- ヘッダー: 「掲示板アプリ」
- 新規投稿ボタン (→ `/new` へリンク)
- 投稿一覧 (最新順、`created_at` の降順)
- 各投稿カード:
  - タイトル (太字・大きめ)
  - 投稿者名
  - 投稿内容
  - 作成日時・更新日時
  - 編集・削除ボタン
- レスポンシブデザイン対応

### 新規投稿ページ (app/new/page.tsx)
- 投稿フォーム
  - タイトル入力欄
  - 投稿者名入力欄
  - 投稿内容入力欄 (テキストエリア)
- 送信ボタン
- キャンセルボタン (→ `/` へ戻る)

### 編集ページ (app/edit/[id]/page.tsx)
- 既存データを事前入力した投稿フォーム
- 更新ボタン
- キャンセルボタン (→ `/` へ戻る)

## Server Actions

```typescript
// app/actions/posts.ts
'use server'

export async function createPost(input: CreatePostInput): Promise<Post>
export async function updatePost(input: UpdatePostInput): Promise<Post>
export async function deletePost(id: number): Promise<void>
export async function getAllPosts(): Promise<Post[]>
export async function getPostById(id: number): Promise<Post | null>
```

## バリデーションルール

| 項目 | ルール |
|------|--------|
| タイトル | 必須、1-100文字、空白のみ不可 |
| 投稿者名 | 必須、1-50文字、空白のみ不可 |
| 投稿内容 | 必須、1-1000文字、空白のみ不可 |

## データ処理ロジック

### 新規投稿時
- `id`: 既存の最大ID + 1を自動採番
- `created_at`: 現在時刻をISO 8601形式で生成
- `updated_at`: `created_at` と同じ値を設定

### 編集時
- `id`, `created_at`: 変更なし
- `updated_at`: 現在時刻で更新
- その他フィールド: フォームの値で更新

## UI/UXガイドライン

- **カラースキーム**: 既存のapp/globals.cssのダークモード対応を継承
- **フォント**: Geist Sans (既存のapp/layout.tsx設定を使用)
- **レスポンシブ**: モバイルファーストデザイン
- **日時表示**: 日本語フォーマット (例: "2025年11月8日 11:04")
- **アクセシビリティ**: 
  - セマンティックHTML使用
  - ARIAラベル適切に設定
  - キーボード操作対応

## エラーハンドリング

- フォーム送信エラー時はエラーメッセージを表示
- データ読み込みエラー時はフォールバックUIを表示
- 削除・編集失敗時はトーストメッセージで通知
- 存在しないIDへのアクセス時は404ページを表示

## 将来的な拡張要素

- ページネーション
- 検索機能
- カテゴリ分類
- 返信機能 (スレッド形式)
- いいね機能
- 画像添付機能
- データベース移行 (PostgreSQL, MongoDB等)
- 認証機能
- リアルタイム更新 (WebSocket / Server-Sent Events)

## 実装優先順位

1. データモデルと型定義の作成
2. データアクセス層の実装 (JSONファイル読み書き)
3. Server Actionsの実装 (CRUD操作)
4. 投稿一覧表示機能
5. 新規投稿機能
6. 編集機能
7. 削除機能
8. スタイリングの調整
9. エラーハンドリングの強化
10. 日時フォーマット機能
