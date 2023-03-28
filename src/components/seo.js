import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          lang
          description
          siteUrl
          locale
          fbappid
        }
      }
    }
  `)

const title = props.pagetitle
  ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
  : data.site.siteMetadata.title

const description = props.pagedesc || data.site.siteMetadata.description

const url = props.pagepath
  ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
  : data.site.siteMetadata.siteUrl

const imgurl = props.pageimg
  ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
  : props.blogimg || `${data.site.siteMetadata.siteUrl}/thumb.jpg`
const imgw = props.pageimgw || 1280
const imgh = props.pageimgh || 640

// 構造化データ用に公開日(datePublished)と更新日(dateModified)の値を設定する
const pdate = props.pubdate || `2023-01-01T08:00:00+08:00`
const mdate = props.moddate || `2023-01-02T09:20:00+08:00`

// 構造化データ用(変数使用)
const ldjson = `{
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "image": "${imgurl}",
    "datePublished": "${pdate}",
    "dateModified": "${mdate}",
    "author": [{
        "@type": "Person",
        "name": "DORAHEI",
        "url": "https://dorahei.com"
    }]
  }
`

  return (
    <>
      <html lang={data.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.locale} />
      <meta property="fb:app_id" content={data.fbappid} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />

      <meta name="twitter:card" content="summary_large_image" />

      {/* 構造化データ_BlogPosting*/}
      <script type="application/ld+json">{ldjson}</script>

  </>
  )
}
export default Seo
