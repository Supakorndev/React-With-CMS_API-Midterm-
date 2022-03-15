import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Checks } from "./Home";
import {Link} from "react-router-dom"
export default function Cards(props) {
  const {count, setcount} = useContext(Checks);
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title style={{display:"-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden"}}>{props.dataset.title.rendered}</Card.Title>
        <Link to={{pathname : `/detail/${props.dataset.id}`}}><Button variant="primary" >Go somewhere</Button></Link>
      </Card.Body>
    </Card>
  );
}
