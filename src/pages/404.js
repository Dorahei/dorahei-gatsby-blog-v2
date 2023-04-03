import React from "react"
import Layout from "../components/layout"

import Seo from "../components/seo"

const NotFound = ({ location }) => (
  <Layout>
    {/* <Seo pagetitle="ページが見つかりません" pagepath={location.pathname} /> */}
    <h1 style={{ padding: "20vh 0", textAlign: "center" }}>
      お探しのページが見つかりませんでした
    </h1>
  </Layout>
)

export default NotFound

export const Head = ({ location }) => (
  <Seo 
  pagetitle="ページが見つかりません" pagepath={location.pathname} 
  // パンくずリスト用にページの深さを設定する。homeが1 aboutは2 BlogPostが3
  pagedepth="2"
  />
  
)
