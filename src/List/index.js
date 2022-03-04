import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@mui/material/Pagination";

import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import ReactPaginate from "react-paginate";

import { Style } from "./Style";

const Index = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  const [validated, setValidated] = useState(false);
  // const [userList, setUserList] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  // useEffect(() => {}, [userList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text) {
      const found = users.find((user) => user.name === text);
      if (found) {
      } else {
        dispatch({ type: "ADD_USER", payload: { name: text, favorite: true } });
        setText("");
      }
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
    search(event.target.value, users);
  };

  const deleteItem = (name) => {
    if (users.length % 4 == 1) {
      if (page > 1) {
        setPage(page - 1);
      }
    }

    dispatch({ type: "DELETE_USER", name });
  };

  const favorateItem = (name) => {
    dispatch({ type: "FAB_USER", name });
  };

  function search(subject, objects) {
    var matches = [];
    var regexp = new RegExp(subject, "g");

    for (var i = 0; i < objects.length; i++) {
      if (objects[i]["name"].match(regexp))
        matches.push({ ...objects[i], name: objects[i]["name"] });
    }
    return matches;
  }

  return (
    <Style>
      <ListGroup>
        <ListGroup.Item className="topClass">
          <strong>Friends List</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="px-0">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your friend`s name"
                  name="text"
                  onChange={handleChange}
                  value={text}
                  // defaultValue="Mark"
                />
              </Form.Group>
            </Row>
          </Form>
        </ListGroup.Item>

        {search(text, users)
          .sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .slice(4 * (page - 1), page * 4)
          .map((item, index) => {
            return (
              <ListGroup.Item key={Math.random()}>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <strong> {item.name} </strong>
                    

                    <div className="span">is your friend </div>
                  </div>
                  <div>
                    {" "}
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        favorateItem(item.name);
                      }}
                      className="mx-2"
                    >
                      {item.favorite ? <AiOutlineStar /> : <AiFillStar />}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        deleteItem(item.name);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
      <Row>
        {users.length > 4 && (
          <Pagination
            count={Math.ceil(users.length / 4)}
            onChange={(e, value) => {
              setPage(value);
            }}
          />
        )}
      </Row>
    </Style>
  );
};

export default Index;
