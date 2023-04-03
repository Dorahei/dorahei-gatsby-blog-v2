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
// const ldjson = `{
//     "@context": "http://schema.org",
//     "@type": "BlogPosting",
//     "headline": "${title}",
//     "image": "${imgurl}",
//     "datePublished": "${pdate}",
//     "dateModified": "${mdate}",
//     "author": [{
//         "@type": "Person",
//         "name": "DORAHEI",
//         "url": "https://dorahei.com"
//     }]
//   }
// `

// // 構造化データ パンくずリスト&Article
// const ldjson = `
//     {
//     "@context": "https://schema.org",
//     "@type": "WebPage",
//     "breadcrumb": {
//         "@type": "BreadcrumbList",
//         "itemListElement": [
//         {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "${data.site.siteMetadata.siteUrl}"
//         },
//         {
//         "@type": "ListItem",
//         "position": 2,
//         "name": "Pages",
//         "item": "${url}"
//         },
//         {
//         "@type": "ListItem",
//         "position": 3,
//         "name": "BlogPost",
//         "item": "${url}"
//         }
//       ]
//     },
//     "mainEntityOfPage": {
//         "@type": "BlogPosting",
//         "headline": "${title}",
//         "image": "${imgurl}",
//         "author": {
//           "@type": "Person",
//           "name": "DORAHEI",
//           "url": "${data.site.siteMetadata.siteUrl}"
//         },
//         "publisher": {
//           "@type": "Organization",
//           "name": "DORAHEI LOOSE LIFE",
//           "logo": {
//             "@type": "ImageObject",
//             "url": "${data.site.siteMetadata.siteUrl}/icons/icon-256x256.png"
//         },
//         "datePublished": "${pdate}",
//         "dateModified": "${mdate}",
//         "description": "${description}",
//         "articleBody": "Write a blog summary here!"
//         }
//     }
//   }
// `

// パンくずリスト1階層目 Home
const itemListElements =[
  {
  "@type": "ListItem",
  "position": 1,
  "name": "Home",
  "item": `${data.site.siteMetadata.siteUrl}`
  }
];

// パンくずリスト2階層 Pages(about/other/cat/blog)
if (props.pagedepth === "2") {
  itemListElements.push(
    {
      "@type": "ListItem",
      "position": 2,
      "name": `${props.pagecontext}`,
      "item": `${url}`
    }
  );
}

// パンくずリスト3階層 BlogPost
if (props.pagedepth === "3") {
  itemListElements.push(
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pages",
      "item": `${data.site.siteMetadata.siteUrl}/blog`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "BlogPost",
      "item": `${url}`
    }
  );
}

const ldjson = `
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(itemListElements)}
    },
    "mainEntityOfPage": {
      "@type": "BlogPosting",
      "headline": "${title}",
      "image": "${imgurl}",
      "author": {
        "@type": "Person",
        "name": "DORAHEI",
        "url": "${data.site.siteMetadata.siteUrl}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DORAHEI LOOSE LIFE",
        "logo": {
          "@type": "ImageObject",
          "url": "${data.site.siteMetadata.siteUrl}/icons/icon-256x256.png"
        }
      },
      "datePublished": "${pdate}",
      "dateModified": "${mdate}",
      "description": "${description}",
      "articleBody": "${description}"
    }
  }
`;

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
