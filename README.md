# ドラヘイの生活 dorahei-gatsby-blog-v2

![ドラヘイの生活](https://dorahei.com)
## Gatsby.js v5.0 に伴う変更 2023/03/28

- HEAD APIに伴うSEOコンポーネントの変更
- Googleの構造化データ用にldjsonの埋め込み
- Git LFSの容量制限回避のために
  - .cacheフォルダと./publicフォルダはgithubにはpushしない。
  - .gitignoreに上記2つを書き込む

## 2023/03/30の改修

構造化データにパンくずリストを追加する。

## 現在把握しているエラー

- Blogpost.jsでリッチテキストが空白だとbuild時にエラー
- Contentful側のリッチテキストが空白だとエラー
