import React from "react";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
/* import posts from "../../../data/posts.json"; */
import BlogItem from "../blog-item/BlogItem";
import { loadPosts } from "../../../data/fetch";

const BlogList = props => {
  const [posts, setPosts] = useState([]);
  const [aggiornaBlogList, setAggiornaBlogList] = useState(false)


  useEffect(() => {
    loadPosts().then(data => setPosts(data.dati));
  }, [aggiornaBlogList]);
  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} setAggiornaBlogList={setAggiornaBlogList} aggiornaBlogList={aggiornaBlogList}  />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
