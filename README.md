# 掲示板アプリケーション

Next.js (App Router) とTypeScriptを使用したシンプルな掲示板アプリケーションです。

## 機能

- ✅ 投稿一覧表示（最新順）
- ✅ 新規投稿機能
- ✅ 投稿編集機能
- ✅ 投稿削除機能
- ✅ レスポンシブデザイン
- ✅ ダークモード対応

## 技術スタック

- **フロントエンド**: Next.js 16.0.1, React 19.2.0, TypeScript
- **スタイリング**: Tailwind CSS v4
- **データ管理**: Server Components + Server Actions
- **データストア**: JSON ファイル

## 必要な環境

- Node.js >= 20.9.0
- npm / yarn / pnpm / bun

## セットアップ

1. 依存関係をインストール:

```bash
npm install
# または
yarn install
# または
pnpm install
# または
bun install
```

2. 開発サーバーを起動:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## プロジェクト構造

```
app/
├── actions/
│   └── posts.ts            # Server Actions (CRUD操作)
├── components/
│   ├── DeleteButton.tsx    # 削除ボタン
│   ├── PostForm.tsx        # 投稿フォーム
│   ├── PostItem.tsx        # 投稿アイテム
│   └── PostList.tsx        # 投稿一覧
├── edit/[id]/
│   └── page.tsx            # 編集ページ
├── new/
│   └── page.tsx            # 新規投稿ページ
├── layout.tsx              # ルートレイアウト
└── page.tsx                # トップページ

lib/
└── posts.ts                # データアクセス層

types/
└── post.ts                 # 型定義

data/
└── posts.json              # データストア
```

## 使い方

### 投稿の作成

1. トップページの「新規投稿」ボタンをクリック
2. タイトル、投稿者名、投稿内容を入力
3. 「投稿する」ボタンをクリック

### 投稿の編集

1. 投稿カードの「編集」ボタンをクリック
2. 内容を編集
3. 「更新する」ボタンをクリック

### 投稿の削除

1. 投稿カードの「削除」ボタンをクリック
2. 確認ダイアログで「削除する」をクリック

## データモデル

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  user_name: string;
  created_at: string; // ISO 8601形式
  updated_at: string; // ISO 8601形式
}
```

## バリデーション

- タイトル: 必須、1-100文字
- 投稿者名: 必須、1-50文字
- 投稿内容: 必須、1-1000文字

## 仕様書

詳細な仕様は [`design.md`](./design.md) を参照してください。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
