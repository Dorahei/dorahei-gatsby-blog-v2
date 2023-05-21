import React from "react"

import { Container, Row, Col } from "react-bootstrap"
import { graphql,  useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

const MyGallery = () => {
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
    <>
        <Container>
                <SimpleReactLightbox>
                    <SRLWrapper>
                        <Row>
                            {data.gallery.edges.map(({node}) => (
                            <Col lg={4} key={node.id} className="gallery">
                                {/* {node.base.split('-').join(' ').split('.')[0]} */}
                                <a href={node.publicURL}>
                                    <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={node.base.split('-').join(' ').split('.')[0]} />
                                </a>
                            </Col>
                            ))}
                        </Row>
                    </SRLWrapper>
                </SimpleReactLightbox>
        </Container>
    </>
    )
}

export default MyGallery
