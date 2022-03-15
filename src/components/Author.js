import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
import axios from "axios";
export default function Author() {
  const [user, setuser] = useState([]);
  useEffect(() => {
    axios.get("https://fswd-wp.devnss.com/wp-json/wp/v2/users").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        setuser((user) => [...user, res.data[i]]);
      }
    });
  }, []);
  return (
    <>
      <Container>
        <Row>
          {user.map((item) => (
            <Col xs={6}>
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={item.avatar_urls[96]} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
