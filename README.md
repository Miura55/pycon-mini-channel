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
- **バックエンドAPI**: FastAPI (http://localhost:8000)
- **APIクライアント**: @hey-api/openapi-ts

## 必要な環境

- Node.js >= 20.9.0
- npm / yarn / pnpm / bun
- **バックエンドAPIサーバー** (http://localhost:8000 で起動している必要があります)

## セットアップ

### 1. バックエンドAPIサーバーを起動

このアプリケーションは、別途起動されているバックエンドAPIサーバー（FastAPI）と連携します。
APIサーバーが `http://localhost:8000` で起動していることを確認してください。

### 2. 依存関係をインストール

```bash
npm install
# または
yarn install
# または
pnpm install
# または
bun install
```

### 3. 環境変数の設定（オプション）

`.env.local` ファイルを作成し、APIのベースURLを設定できます。
デフォルトは `http://localhost:8000` です。

```bash
cp .env.example .env.local
```

### 4. 開発サーバーを起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

### 5. ブラウザで確認

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## API仕様

このアプリケーションは、以下のAPIエンドポイントを使用します：

- `GET /entries` - 全投稿を取得
- `POST /entries` - 新規投稿を作成
- `PATCH /entries/{entry_id}` - 投稿を更新
- `DELETE /entries/{entry_id}` - 投稿を削除

APIクライアントは `@hey-api/openapi-ts` によって自動生成されています。

## プロジェクト構造

```
app/
├── actions/
│   └── posts.ts            # Server Actions (API呼び出しのラッパー)
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

api/                        # 自動生成されたAPIクライアント
├── client.gen.ts           # APIクライアント設定
├── sdk.gen.ts              # API関数
├── types.gen.ts            # API型定義
└── index.ts                # エクスポート

types/
└── post.ts                 # アプリケーション型定義
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
