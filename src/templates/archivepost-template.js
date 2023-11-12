import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Seo from "../components/seo"

const ArchivepostTemp = ({ data }) => (
  <Layout>
    {/* ここからブログ本文 */}
    <article className="content">
      <div className="container">
        <h1 className="bar">{data.markdownRemark.frontmatter.title}</h1>
        {/* MarkdownでのHTML表示 */}
        <section>
          <div className="postbody">
            <div dangerouslySetInnerHTML={{__html:data.markdownRemark.html}} />
          </div>
        </section>
      </div>
    </article>
  </Layout>
)


export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

export default ArchivepostTemp

export const Head = ({data, location}) => (
  <Seo
      pagetitle={data.markdownRemark.frontmatter.title}
      pagedesc={`${(data.markdownRemark.frontmatter.description).slice(0, 70)}…`}
      pagepath={location.pathname}
      // blogimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
      // pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
      // pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
      //サイトの構造化データに必要なパラメータを渡す
      // pubdate={data.contentfulBlogPost.publishDate}
      // moddate={data.contentfulBlogPost.updatedAt}
      // パンくずリスト用にページの深さを設定する。homeが1 aboutは2 BlogPostが3
      pagedepth="3"
  />
)
