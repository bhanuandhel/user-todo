import {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col} from "react-bootstrap";
import List from './List/';

function App() {
  return (
    <>
      <Container>
        <Row className="pt-5">
            <Col xs={12} md={4}>
            </Col>
            <Col xs={12} md={4}>
                <List />
            </Col>
            <Col xs={12} md={4}>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
