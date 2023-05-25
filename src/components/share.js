import React from "react"
import {
    FacebookShareButton,
    TwitterShareButton,
    LineShareButton,
    HatenaShareButton,
    FacebookIcon,
    TwitterIcon,
    LineIcon,
    HatenaIcon,
} from "react-share"

const Share = props => {
    const articleTitle = props.articleTitle
    const articleUrl = props.articleUrl
    const iconSize = 75

    return (
        <div className="share">
        <p className="share__title">SHARE!</p>
        <div className="social-links">
            <div className="social-links__icon">
            <TwitterShareButton url={articleUrl} title={articleTitle}>
                <TwitterIcon round size={iconSize} />
            </TwitterShareButton>
            </div>
            <div className="social-links__icon">
            <FacebookShareButton url={articleUrl}>
                <FacebookIcon round size={iconSize} />
            </FacebookShareButton>
            </div>
            <div className="social-links__icon">
            <LineShareButton url={articleUrl} title={articleTitle}>
                <LineIcon round size={iconSize} />
            </LineShareButton>
            </div>
            <div className="social-links__icon">
            <HatenaShareButton url={articleUrl} title={articleTitle}>
                <HatenaIcon round size={iconSize} />
            </HatenaShareButton>
            </div>
        </div>
        </div>
    )
}

export default Share
