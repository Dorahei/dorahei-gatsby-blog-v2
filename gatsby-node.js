const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogresult = await graphql(`
    query {
      allContentfulBlogPost(sort: {publishDate: DESC}) {
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
      allContentfulCategory {
        edges {
          node {
            categorySlug
            id
            category
            blogpost {
              title
            }
          }
        }
      }
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
  `)
  // allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}}} sort: {frontmatter: {date: DESC}}) {
  //   nodes {
  //     frontmatter {
  //       title
  //       date(formatString: "YYYY年MM月DD日")
  //       description
  //       slug
  //     }
  //     id
  //   }
  //   totalCount
  // }



  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQL のクエリでエラーが発生しました`)
    return
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.slug}/`,
        component: path.resolve(`./src/templates/blogpost-template.js`),
        context: {
          id: node.id,
          next,
          previous,
        },
      })
    }
  )

  const blogPostsPerPage = 6 //１ページに表示する記事の数
  const blogPosts = blogresult.data.allContentfulBlogPost.edges.length //記事の総数
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage) //記事一覧ページの総数

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1, //現在のページ番号
        isFirst: i + 1 === 1, //最初のページ
        isLast: i + 1 === blogPages, //最後のページ
      },
    })
  })

  blogresult.data.allContentfulCategory.edges.forEach(({ node }) => {
    const catPostsPerPage = 6 //１ページに表示する記事の数
    if (!node.blogpost) return [];  // カテゴリーに属する記事がない場合は配列を返す
    const catPosts = node.blogpost.length //カテゴリーに属した記事の総数
    const catPages = Math.ceil(catPosts / catPostsPerPage) //カテゴリーページの総数

    Array.from({ length: catPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/cat/${node.categorySlug}/`
            : `/cat/${node.categorySlug}/${i + 1}/`,
        component: path.resolve(`./src/templates/cat-template.js`),
        context: {
          catid: node.id,
          catname: node.category,
          catslug: node.categorySlug,
          skip: catPostsPerPage * i,
          limit: catPostsPerPage,
          currentPage: i + 1, //現在のページ番号
          isFirst: i + 1 === 1, //最初のページ
          isLast: i + 1 === catPages, //最後のページ
        },
      })
    })
  })
// }

// 2023-11-12追加：archiveページの追加試作 start
  blogresult.data.allMarkdownRemark.nodes.forEach((node) => {

    createPage({
      path: `/archive/post/${node.frontmatter.slug}/`,
      component: path.resolve("./src/templates/archivepost-template.js"),
      context: {
        id: node.id
      },
    })
  })
}
// 2023-11-12追加：archiveページの追加試作 end

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
          process: require.resolve("process/browser")
      },
    },
  })
}
