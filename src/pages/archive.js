import React from "react"
import { graphql, Link } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import Seo from "../components/seo"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons"

const ArchiveTemp = ({ data }) => (
  <Layout>
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">ARCHIVE POSTS</h1>
        <div className="posts">
          {data.allMarkdownRemark.nodes.map(({ frontmatter, id }) => (
            <article className="post" key={id}>
              <Link to={`/archive/post/${frontmatter.slug}/`}>
                <h3>{frontmatter.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
)

export const query = graphql`
  query{
    allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}}} sort: {frontmatter: {date: DESC}}) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY年MM月DD日")
          description
          slug
        }
        id
      }
      totalCount
    }
  }
`

export default ArchiveTemp

export const Head = ({location}) => (
  <Seo
    pagepath={location.pathname}
    pagetitle="アーカイブ"
    pagedesc="DORAHEIのアーカイブです"
    // パンくずリスト用にページの深さを設定する。homeが1 aboutは2 ArchivePostが3
    pagedepth="2"
    // パンくずリスト用にカテゴリーの名前を渡す
    pagecontext="Archive"
  />
)
