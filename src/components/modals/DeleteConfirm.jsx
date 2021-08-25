import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../redux/actions/ingredientsAction";

const DeleteConfirm = ({ show, onHide }) => {
  const { oneItem } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  // const [errMsg, setErrMsg] = useState("");

  const handleDelete = () => {
    dispatch(deleteItem(oneItem._id));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Do you really want to delete?!`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;
