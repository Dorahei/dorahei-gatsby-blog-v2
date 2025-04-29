import React from "react"

// import { Container, Row, Col } from "react-bootstrap"
import { graphql,  useStaticQuery } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"
// import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import  { Lightbox } from "yet-another-react-lightbox";
import  "yet-another-react-lightbox/styles.css" ;

const MyGallery = () => {
    const [open, setOpen] = React.useState(false);
    const data = useStaticQuery(graphql`
    query {
        gallery: allFile(filter: {relativeDirectory: {eq: "gallery"}}
        sort: {base: ASC} ) {
            edges {
                node {
                    id
                    base
                    publicURL
                    childImageSharp {
                            gatsbyImageData(
                            width: 900
                            height: 600
                            transformOptions: {fit: COVER}
                            placeholder: BLURRED
                            webpOptions: {quality: 50}
                        )
                    }
                }
            }
        }
    }
`)

return (
    // <>
    //     <Container>
    //             <SimpleReactLightbox>
    //                 <SRLWrapper>
    //                     <Row>
    //                         {data.gallery.edges.map(({node}) => (
    //                         <Col lg={4} key={node.id} className="gallery">
    //                             {/* {node.base.split('-').join(' ').split('.')[0]} */}
    //                             <a href={node.publicURL}>
    //                                 <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={node.base.split('-').join(' ').split('.')[0]} />
    //                             </a>
    //                         </Col>
    //                         ))}
    //                     </Row>
    //                 </SRLWrapper>
    //             </SimpleReactLightbox>
    //     </Container>
    // </>
    <>
        <h3>画像をクリックすることでギャラリーページへ</h3>
        <button type="button" onClick={() => setOpen(true)}>
            <img src={data.gallery.edges[0].node.publicURL} alt="ギャラリーページへ" style={{ width: '100%' }} />
        </button>

        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={data.gallery.edges.map(({ node }) => ({
                src: node.publicURL
            }))}
        />
    </>
    )
}

export default MyGallery
