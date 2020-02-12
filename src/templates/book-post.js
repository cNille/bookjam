import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BookPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  author,
  read,
  pages,
  summery,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>Author: {author}</p>
            <p>Nbr of pages: {pages}</p>
            <p>Read: {new Date(read).toLocaleString()}</p>
            <p>Description: {description}</p>
            <p>My Summery: {summery}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

const BookPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BookPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Book">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
        pages={post.frontmatter.pages}
        summery={post.frontmatter.summery}
        read={post.frontmatter.read}
      />
    </Layout>
  );
};

BookPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BookPost;

export const pageQuery = graphql`
  query BookPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        tags
        summery
        author
        pages
        read
      }
    }
  }
`;
