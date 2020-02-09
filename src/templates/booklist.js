import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BookListPostTemplate = ({
  content,
  contentComponent,
  name,
  description,
  books,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h2>{name}</h2>
            <p>{description}</p>
            <ul>
              {books.map(b => (
                <li>{JSON.stringify(b)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

BookListPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BookListPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BookListPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        name={post.frontmatter.name}
        books={post.frontmatter.books}
        helmet={
          <Helmet titleTemplate="%s | BookList">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  );
};

BookListPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BookListPost;

export const pageQuery = graphql`
  query BookListPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        description
        books
      }
    }
  }
`;
