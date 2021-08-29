import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createOneDish } from "../../redux/actions/dishesAction";

const CreateDish = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValue.trim()) return setError("plz enter a title");
    dispatch(createOneDish({ title: titleValue }));
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Dish
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setTitleValue(e.currentTarget.value)}
          value={titleValue}
          placeholder={"Give Me A Name!"}
        />
        <p className={"text-danger"}>{error}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDish;
