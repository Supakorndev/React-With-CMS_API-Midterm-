import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cards from "./Cards";

const Checks = React.createContext();
export default function Home() {
  const [newdata, setnewdata] = useState([]);
  const [count, setcount] = useState(0);
  useEffect(() => {
    console.log(newdata);
    axios.get("https://fswd-wp.devnss.com/wp-json/wp/v2/posts").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        setnewdata((newdata) => [...newdata, res.data[i]]);
      }
    });
  }, []);
  return (
    <>
      <Container fluid className="px-0">
        <div
          className="jumbotron text-center"
          style={{
            backgroundImage: `url("https://wallpapercave.com/wp/wp2818490.jpg")`,
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            paddingTop: "15%",
            paddingBottom: "15%",
          }}
        >
          <h1 style={{ color: "white", fontSize: "50px" }}>New Activity</h1>
          <h3 style={{ color: "white" }}>Supakorn Kitiwattnakorn</h3>
        </div>
        <Container>
          <h1 className="text-center pt-4">New Arrival</h1>
          <hr />
          <Row>
            {newdata.map((value) => (
              <Col xs={4} className="pt-5" style={{ paddingLeft: "5%" }}>
                <Checks.Provider value={{count, setcount}}>
                  <Cards dataset={value}></Cards>
                </Checks.Provider>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
export {Checks};