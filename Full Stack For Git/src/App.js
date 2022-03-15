import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Categories from "./components/Categories";
import Author from "./components/Author";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">KMITL X IT</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/"><Nav.Link href="#home">Home</Nav.Link></Link>
            <Link to="/Categories"><Nav.Link href="#features">Categories</Nav.Link></Link>
            <Link to="/Author"><Nav.Link href="#features">Author</Nav.Link></Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/Categories" element={<Categories />}></Route>
        <Route path="/Author" element={<Author />}></Route>
      </Routes>
    </>
  );
}

export default App;
