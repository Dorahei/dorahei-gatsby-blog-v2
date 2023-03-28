import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare , faQuestionCircle, faCircleExclamation} from "@fortawesome/free-solid-svg-icons"

import Seo from "../components/seo"

const Other = ({ data, location }) => (
  <Layout>
    <div className="eyecatch">
      <figure>
        <GatsbyImage
          image={data.other.childImageSharp.gatsbyImageData}
          alt="背景画像の草原"
        />
      </figure>
    </div>
    <article className="content">
      <div className="container">
        <h1 className="bar">その他</h1>
        <aside className="info">
          <div className="subtitle">
            <FontAwesomeIcon icon={faCheckSquare} />
            問い合わせ＆プライバシーポリシー
          </div>
        </aside>
        <div className="postbody">
          <p>
            このページではお問い合わせフォームとプライバシーポリシーについて記載しています。
          </p>
          <hr/>
          <h2>
            <FontAwesomeIcon icon={faQuestionCircle} />
            お問い合わせ
          </h2>
          <div className="iframe-wrapper">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScOAn2lAPwY5GYVn6WAAthHzk7bHEVgJTy5UUu1PsNnfuCBiA/viewform?embedded=true" title="GoogleForms" frameborder="0" marginheight="0" marginwidth="0" height="960px"  width="100%">読み込んでいます…</iframe>
          </div>
          <hr/>
          <h2>
            <FontAwesomeIcon icon={faCircleExclamation} />
            プライバシーポリシー
          </h2>
          <p>【ドラヘイの生活】(以下「当ブログ」)のプライバシーポリシー・免責事項を次の通り記載します。</p>
          <h3>
            個人情報の利用目的について
          </h3>
          <p>当ブログでは、お問い合わせやコメント投稿の際に氏名・メールアドレス等の個人情報を入力いただく場合があります。<br/>
            取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。<br/>
            </p>
          <h3>個人情報の第三者開示について</h3>
            <p>取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
            <ul>
              <li>本人の同意が得られた場合</li>
              <li>法令により開示が求められた場合</li>
            </ul>
          <h3>Cookieの使用について</h3>
            <p>当ブログでは、広告配信やアクセス解析のためにCookieを使用しています。<br/>
              Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。<br />
              Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。<br/>
            </p>
          <h3>広告配信サービスについて</h3>
            <p>当ブログでは、第三者配信の広告サービスを利用して広告を掲載しています。<br/>
              第三者配信事業者は、ユーザーの興味に応じたパーソナライズ広告を表示するためにCookieを使用しています。<br/>
              パーソナライズ広告は、広告設定で無効にできます。<br/>
              また、www.otherads.infoで第三者配信事業者のCookieを無効にすることができます。<br/>
              <s>Amazonのアソシエイトとして、【ドラヘイの生活】は適格販売により収入を得ています</s><br/>
            </p>
          <h3>アクセス解析ツールについて</h3>
            <p>当ブログでは、Googleアナリティクスによりアクセス情報を解析しています。<br/>
              アクセス情報の解析にはCookieを使用しています。<br/>
              また、アクセス情報の収集はCookieを無効にすることで拒否できます。<br/>
            Google社のデータ収集・処理の仕組みについては、<Link to={ `https://policies.google.com/technologies/partner-sites?hl=ja`}>こちら</Link>をご覧ください。<br/>
              </p>
          <h3>免責事項</h3>
            <p>当ブログは、掲載内容によって生じた損害に対する一切の責任を負いません。<br />
              各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。<br />
              また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。<br />
            </p>
          <h3>著作権</h3>
            <p>当ブログに掲載されている文章・画像の著作権は、運営者に帰属しています。<br />
              法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
            </p>
          <h3>プライバシーポリシーの変更</h3>
            <p>当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。<br />
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
            <ul>
              <li>制定日:2022年01月01日</li>
              <li>改定日:2023年04月01日</li>
            </ul>
            <p><b>【ドラヘイの生活｜Twitter:@Dorahei_Smile】</b></p>
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query {
    other: file(relativePath: { eq: "bg_natural_sougen.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
        original {
          src
          height
          width
        }
      }
    }
  }
`
export default Other


export const Head = ({ location, data }) => (
  <Seo
  pagedesc="問い合わせ、プライバシーポリシーなど"
  pagepath={location.pathname}
  pageimg={data.other.childImageSharp.original.src}
  pageimgw={data.other.childImageSharp.original.width}
  pageimgh={data.other.childImageSharp.original.height}
  pagetitle="その他の情報"
  />
)
