import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Share from "../components/share"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons"

import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"

import Seo from "../components/seo"

// コードブロックのシンタックスハイライト
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <GatsbyImage
        image={node.data.target.gatsbyImageData}
        alt={
          node.data.target.description
            ? node.data.target.description
            : node.data.target.title
        }
      />
    ),
    // コードブロックをdivで括る
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.length === 1 &&
        node.content[0].marks.find((x) => x.type === "code")
      ) {
        return <div>{children}</div>;
      }
      return <p>{children}</p>;
    },
  },
  // コードブロック
  renderMark: {
    [MARKS.CODE]: code,
  },
  renderText: text => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
}

// コードブロックのシンタックスハイライト
function code(text) {
  text.shift(); // コードブロックのfalseを削除
  const language = text.shift(); // コードブロックの1行目の言語指定をClassに利用後削除
  text.shift(); // コードブロックの1行目の改行を削除

  const value = text.reduce((acc, cur) => {
    if (typeof cur !== "string" && cur.type === "br") {
      return acc + "\n";
    }
    return acc + cur;
  }, "");

  return (
    <>
      <div className="code-block-filename">{language}</div>
      <SyntaxHighlighter language={language} showLineNumbers={true} style={okaidia}>
      {value}
      </SyntaxHighlighter>
    </>
  );
}

const BlogpostTemp = ({ data, pageContext }) => (
  <Layout>
    <div className="eyecatch">
      <figure>
        <GatsbyImage
          image={data.contentfulBlogPost.eyecatch.gatsbyImageData}
          alt={data.contentfulBlogPost.eyecatch.description}
        />
      </figure>
    </div>
    {/* Shareコンポーネント追加 */}
    <Share 
      articleTitle={data.contentfulBlogPost.title}
      articleUrl={`${data.site.siteMetadata.siteUrl}/blog/post/${data.contentfulBlogPost.slug}/`}
      />
    {/* ここからブログ本文 */}
    <article className="content">
      <div className="container">
        <h1 className="bar">{data.contentfulBlogPost.title}</h1>
        <aside className="info">
          <time dateTime={data.contentfulBlogPost.publishDate}>
            <FontAwesomeIcon icon={faClock} />
            {data.contentfulBlogPost.publishDateJP}
          </time>
          <div className="cat">
            <FontAwesomeIcon icon={faFolderOpen} />
            <ul>
              {data.contentfulBlogPost.category.map(cat => (
                <li className={cat.categorySlug} key={cat.id}>
                  <Link to={`/cat/${cat.categorySlug}/`}>{cat.category}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* RichTextでのHTML表示 */}
        <div className="postbody">
          {renderRichText(data.contentfulBlogPost.content, options)}
        </div>
        {/* MarkdownでのHTML表示 */}
        <div className="postbody">
          <div dangerouslySetInnerHTML={{__html:data.contentfulBlogPost.childContentfulBlogPostMarkdownBodyTextNode.childMarkdownRemark.html}} />
        </div>
        {/* ページの遷移のためのリンク */}
        <ul className="postlink">
          {pageContext.next && (
            <li className="prev">
              <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>{pageContext.next.title}</span>
              </Link>
            </li>
          )}
          {pageContext.previous && (
            <li className="next">
              <Link to={`/blog/post/${pageContext.previous.slug}/`} rel="next">
                <span>{pageContext.previous.title}</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
      publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
      publishDate
      updatedAt
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        gatsbyImageData(layout: FULL_WIDTH)
        description
        file {
          details {
            image {
              width
              height
            }
          }
          url
        }
      }
      content {
        raw
      }
      childContentfulBlogPostMarkdownBodyTextNode {
        childMarkdownRemark {
        html
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default BlogpostTemp

export const Head = ({data, location}) => (
  <Seo
      pagetitle={data.contentfulBlogPost.title}
      pagedesc={`${documentToPlainTextString(
        JSON.parse(data.contentfulBlogPost.content.raw)
      ).slice(0, 70)}…`}
      pagepath={location.pathname}
      blogimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
      pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
      pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
      //サイトの構造化データに必要なパラメータを渡す
      pubdate={data.contentfulBlogPost.publishDate}
      moddate={data.contentfulBlogPost.updatedAt}
      // パンくずリスト用にページの深さを設定する。homeが1 aboutは2 BlogPostが3
      pagedepth="3"
      // blog または archive
      pagetype="blog"
  />
)
