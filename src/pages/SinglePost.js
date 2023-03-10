import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import client from "../client"
import BlockContent from "@sanity/block-content-to-react"
import "../css/SinglePost.css"

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
        title,
        body,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      }`
      )
      .then((data) => setSinglePost(data[0]))
    setIsLoading(false)
  }, [slug])

  return (
    <>
      {isLoading ? (
        <h1 >
          Loading...
        </h1>
      ) : (
        <section >
          <h1 >
            {singlePost.title}
          </h1>
          {singlePost.mainImage && singlePost.mainImage.asset && (
            <img className="image"
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
              title={singlePost.title}
              
            />
          )}
          <p>By Team Compound</p>

          <div >
            <BlockContent
              blocks={singlePost.body}
              projectId="e0baqmhm"
              dataset="production"
            />
          </div>

          <button>
            <Link
              to="/blog"
              
            >
              Read more articles
            </Link>
          </button>
        </section>
      )}
    </>
  )
}
