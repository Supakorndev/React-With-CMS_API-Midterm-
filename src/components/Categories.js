import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import axios from "axios";
import Parser from "html-react-parser";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const [post, setpost] = useState([]);
  const [present, setpresent] = useState({});
  useEffect(() => {
    axios
      .get("https://fswd-wp.devnss.com/wp-json/wp/v2/categories")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          setcategories((categories) => [...categories, res.data[i]]);
        }
      });
    axios.get("https://fswd-wp.devnss.com/wp-json/wp/v2/posts").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        setpost((post) => [...post, res.data[i]]);
      }
    });
  }, []);
  return (
    <>
      <Container style={{paddingTop: "2%"}}>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">
                  {categories.map((value) => (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => {
                          setpresent(value);
                        }}
                        href={"#" + value.name}
                      >
                        {value.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Card.Header>
              <Card.Body>
                <Row>
                  {post.map((item) => {
                    for (let i = 0; i < item.categories.length; i++) {
                      if (item.categories[i] === present.id) {
                        console.log(present.id)
                        return (
                          <Col xs={12}>
                            <Card style={{ width: "100%", marginBottom: "3%" }}>
                              <Card.Body>
                                <Card.Title>{item.title.rendered}</Card.Title>
                                <Card.Text style={{display:"-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden"}}>
                                  {Parser(item.content.rendered)}
                                </Card.Text>
                                <Link to={{pathname : `/detail/${item.id}`}}><Button className="btn btn-primary">Go To Detail</Button></Link>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      } else {
                        continue;
                      }
                    }
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
