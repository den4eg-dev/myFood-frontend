import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, FormControl, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import dummyImg from "../../assets/images/dummy.jpg";
import { CreateOneItem } from "../../redux/actions/ingredientsAction";

const CreateIngredient = ({ show, onHide }) => {
  const image = null;
  const dispatch = useDispatch();
  const [proteinValue, setProteinValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [caloriesValue, setCaloriesValue] = useState("");
  const [carbsValue, setCarbsValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const URL = "http://localhost:5000/";

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = window.URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => window.URL.revokeObjectURL(objectUrl);
  }, [file]);

  const resetForm = () => {
    setProteinValue("");
    setFatValue("");
    setCaloriesValue("");
    setCarbsValue("");
    setTitleValue("");
    setFile(null);
    setError("");
  };

  const selectFile = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    console.log(dummyImg);
    const types = ["image/png", "image/jpeg"];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleValue.trim() === "") {
      setError("plz enter a title!");
      return;
    }

    const formData = new FormData();

    formData.append("fat", `${fatValue || 0}`);
    formData.append("carbs", `${carbsValue || 0}`);
    formData.append("calories", `${caloriesValue || 0}`);
    formData.append("protein", `${proteinValue || 0}`);
    formData.append("title", `${titleValue}`);
    if (file) formData.append("image", file);

    dispatch(CreateOneItem(formData));
    onHide();
    resetForm();
  };

  const handleClose = () => {
    onHide();
    setFile(null);
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create item
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
        <Form>
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
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setTitleValue(e.currentTarget.value)}
              value={titleValue}
            />
          </InputGroup>
          <InputGroup className={"mb-2"} size="lg">
            <InputGroup.Text className={"w-50"}>Protein</InputGroup.Text>

            <Form.Control
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
              aria-label="Large"
              type={"number"}
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setCarbsValue(e.currentTarget.value)}
              value={carbsValue}
            />
          </InputGroup>
          <InputGroup className={"mb-2"} size="lg">
            <InputGroup.Text className={"w-50"}>Fat</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              type={"number"}
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setFatValue(e.currentTarget.value)}
              value={fatValue}
            />
          </InputGroup>
          <InputGroup className={"mb-2"} size="lg">
            <InputGroup.Text className={"w-50"}>Calories</InputGroup.Text>
            <Form.Control
              type={"number"}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setCaloriesValue(e.currentTarget.value)}
              value={caloriesValue}
            />
          </InputGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-success" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateIngredient;
