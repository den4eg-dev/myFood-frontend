import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, FormControl, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOneItem } from "../../redux/actions/ingredientsAction";
import dummyImg from "../../assets/images/dummy.jpg";

const UpdateIngredient = ({ show, onHide }) => {
  const { oneItem } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const { protein, fat, carbs, calories, title, _id, image } = oneItem;
  const [proteinValue, setProteinValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [caloriesValue, setCaloriesValue] = useState("");
  const [carbsValue, setCarbsValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    setCaloriesValue(calories);
    setTitleValue(title);
    setCarbsValue(carbs);
    setFatValue(fat);
    setProteinValue(protein);
    console.log("UPDATE MODAL RENDER");
  }, [calories, protein, fat, carbs, title]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = window.URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => window.URL.revokeObjectURL(objectUrl);
  }, [file]);

  const selectFile = (e) => {
    let selected = e.target.files[0];
    const types = ["image/png", "image/jpeg"];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const handleUpdateItem = () => {
    const formData = new FormData();
    formData.append("fat", `${fatValue || 0}`);
    formData.append("carbs", `${carbsValue || 0}`);
    formData.append("calories", `${caloriesValue || 0}`);
    formData.append("protein", `${proteinValue || 0}`);
    formData.append("title", `${titleValue}`);

    // formData.append("path", `${image.path}`);
    if (file) {
      formData.append("image", file);
      if (oneItem.image)
        formData.append("filename", `${oneItem.image.filename}`);
    }
    dispatch(updateOneItem(_id, formData));
    onHide();
    setFile(null);
  };

  const handleClose = () => {
    onHide();
    setFile(null);
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update item
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          className={"d-flex justify-content-center mb-2  align-items-center"}
        >
          {image ? (
            <img
              className="img"
              src={preview || URL + image.path}
              alt={image.path}
            />
          ) : (
            <img className="img" src={preview || dummyImg} alt="dummy" />
          )}
        </div>
        <Form.Control
          size="lg"
          type="file"
          className={"mb-5"}
          placeholder="Large text"
          onChange={selectFile}
        />
        {error && <p className={"text-danger"}>{error}</p>}
        <InputGroup className={"mb-2"} size="lg">
          <InputGroup.Text className={"w-50"}>Title</InputGroup.Text>
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setTitleValue(e.currentTarget.value)}
            value={titleValue}
          />
        </InputGroup>
        <InputGroup className={"mb-2"} size="lg">
          <InputGroup.Text className={"w-50"}>Protein</InputGroup.Text>

          <FormControl
            aria-label="Large"
            type={"number"}
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setProteinValue(e.currentTarget.value)}
            value={proteinValue}
          />
        </InputGroup>
        <InputGroup className={"mb-2"} size="lg">
          <InputGroup.Text className={"w-50"}>Carbs</InputGroup.Text>
          <FormControl
            type={"number"}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setCarbsValue(e.currentTarget.value)}
            value={carbsValue}
          />
        </InputGroup>
        <InputGroup className={"mb-2"} size="lg">
          <InputGroup.Text className={"w-50"}>Fat</InputGroup.Text>
          <FormControl
            type={"number"}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setFatValue(e.currentTarget.value)}
            value={fatValue}
          />
        </InputGroup>
        <InputGroup className={"mb-2"} size="lg">
          <InputGroup.Text className={"w-50"}>Calories</InputGroup.Text>
          <FormControl
            type={"number"}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setCaloriesValue(e.currentTarget.value)}
            value={caloriesValue}
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-success" onClick={handleUpdateItem}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateIngredient;
