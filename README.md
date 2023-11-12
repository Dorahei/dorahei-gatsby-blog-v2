# ドラヘイの生活 dorahei-gatsby-blog-v2

[ドラヘイの生活](https://dorahei.com)

## 2023/11/12 : アーカイブページ導入検討、フォルダ内でMarkdownファイルを管理するブログ

1. **GatsbyStarterBlog** の `content/blog` のフォルダをコピー
2. `npm install gatsby-remark-images` をインストール（インライン画像、マークダウン/MDX 本文自体に画像を含めることもできます。）
3. `archivepost-template.js` と `archive.js` ページの追加
4. `gatsby-node` と `gatsby-config` の変更

## 2023/10/24 layout.cssの調整

引用のアイコンをコメントアウト ` /*content: "\f10d";*/ `

## 2023/06/18 GTAGの GTAG_TRACKING_ID 変更

`G-LYEV5KR978` -> `GT-MK48CCL`

## 2023/05/24 SNSのSHAREボタン追加

1. `npm install --save react-share  --legacy-peer-deps` -> `npm audit fix` を実行
2. cssの調整
## 2023/05/09 ギャラリーを追加してみる

1. `gatsby-theme-gallery` を追加してみる。-> **失敗**
2. lazyloadで画像がうまく表示されない -> `gatsby clean`をして解決

### CSSの変更 引用部分の装飾

```html:引用_blocquote
<blockquote>
<p>ここに本文を書く
  <cite>引用元</cite>
</p>
</blockquote>
```

### CSSの変更 本文のmarginとline-height設定

margin 0; ->  line-height: 1.0em;
              margin-bottom: 2.0em;
              padding: 0;

## 2023/05/17 react-bootstrap の導入

`npm install react-bootstrap bootstrap --legacy-peer-deps` でinstall後、`npm audit fix` を実行 -> 失敗
とりあえず、動いてはいる。

### cssを読み込む

上位のコンポーネントでimport
index.js,App.jsなどの上位のコンポートで下記を指定してインポートします。
`import 'bootstrap/dist/css/bootstrap.min.css';`

## simple-react-lightboxのインストール

`npm install --save simple-react-lightbox` でinstall `npm audit fix` を実行 -> 失敗

## 2023/05/13 の改修検討

### Galleryプラグインのインストールを試す

`npm install --save @browniebroke/gatsby-image-gallery ` -> 失敗

![Gatsby.jsのビルドでWebpackのエラーが出たので対処した](https://note.com/sakay_y/n/n33a3915e1eda)

### ChatGPTでの返答

このエラーメッセージは、Webpackのバージョンが5未満の場合に発生する可能性があります。Webpack 5では、デフォルトでNode.jsのコアモジュールのポリフィルが含まれなくなったため、このエラーメッセージが表示されます。エラーメッセージには、このモジュールが必要かどうかを確認し、ポリフィルを設定するようにとの指示が含まれています。

このエラーに対処するためには、以下の手順を実行します。

ポリフィルを含める場合:

resolve.fallbackに以下の設定を追加します: {"process": require.resolve("process/browser")}
processモジュールをインストールします: npm install process

ポリフィルを含めない場合:

resolve.fallbackに以下の設定を追加します: {"process": false}
具体的な手順は、Webpackの設定ファイル（通常はwebpack.config.js）に対して行われます。上記の対応策を適切に設定することで、エラーが解決するはずです。

## 2023/03/30 の改修

構造化データにパンくずリストを追加する。

## Gatsby.js v5.0 に伴う変更 2023/03/28

- HEAD APIに伴うSEOコンポーネントの変更
- Googleの構造化データ用にldjsonの埋め込み
- Git LFSの容量制限回避のために
  - .cacheフォルダと./publicフォルダはgithubにはpushしない。
  - .gitignoreに上記2つを書き込む

## その他の変更 : gtag の変更 -> 測定IDを変更を検討

`G-LYEV5KR978` ->  `GT-MK48CCL`

## 把握しているエラー

- Blogpost.jsでリッチテキストが空白だとbuild時にエラー
- Contentful側のリッチテキストが空白だとエラー
