import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Parser from "html-react-parser";
import { getElementById } from "domutils";
export default function Detail() {
  const { id } = useParams();
  const [content, setcontent] = useState("");
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState([]);
  useEffect(() => {
    axios
      .get("https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + id)
      .then((res) => {
        setcontent(res.data.content.rendered);
        settitle(res.data.title.rendered);
      });
    axios
      .get(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=" +
          id +
          "&per_page=100"
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          setcomment((comment) => [...comment, res.data[i]]);
        }
      });
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} style={{ paddingTop: "3%" }}>
            <Card style={{ padding: "3%" }}>
              <h1 className="text-center">{title}</h1>
              {Parser(content)}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ paddingTop: "3%" }}>
            <h1>Comment</h1>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                let header = {
                  Authorization: "Basic ZnN3ZDpmc3dkLWNtcw=="
                }
                let params = {
                    post: id,
                    author_name: document.getElementById("name_user").value,
                    content: document.getElementById("comment").value,
                }
                axios
                  .post(
                    "https://fswd-wp.devnss.com/wp-json/wp/v2/comments",params,
                    {headers: header}
                  )
                  .then(() => {
                    console.log("Send");
                    window.location.reload();
                  });
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="input"
                  id="name_user"
                  placeholder="Name Here"
                />
                <Form.Label>Your comment Here</Form.Label>
                <Form.Control
                  type="textarea"
                  id="comment"
                  placeholder="Comment Here"
                />
                <Form.Text className="text-muted">
                  Share your fantastic comment
                </Form.Text>
              </Form.Group>
              <input className="btn btn-success" type="submit" />
            </Form>
            {comment.map((item) => {
              return (
                <Card style={{ marginTop: "5%" }}>
                  <Row>
                    <Col xs={2}>
                      <img src={item.author_avatar_urls[96]}></img>
                      <br />
                      <p>User : {item.author_name}</p>
                      <p>ID : {item.id}</p>
                    </Col>
                    <Col xs={10}>{Parser(item.content.rendered)}</Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}
