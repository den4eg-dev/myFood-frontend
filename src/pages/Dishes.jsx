import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Offcanvas,
} from "react-bootstrap";
import SummaryList from "../components/summary/SummaryList";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneDish, fetchDishes } from "../redux/actions/dishesAction";
import CreateIngredient from "../components/modals/CreateIngredients";
import CreateDish from "../components/modals/CreateDish";
import DeleteConfirm from "../components/modals/DeleteConfirm";
import { setOneItemData } from "../redux/actions/ingredientsAction";
import Meals from "./Meals";

const Dishes = () => {
  const [showCreateDishModal, setShowCreateDishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchDishes());
    console.log("DISHES RENDER");
  }, [isLoading]);

  const handleAddDishes = () => {
    setShowCreateDishModal(true);
  };
  const handleDeleteItem = (id) => {
    dispatch(deleteOneDish(id));
  };
  return (
    <div className={"page"}>
      <Container>
        <h1>DISHES</h1>
        <div className={"d-flex justify-content-end"}>
          <Button
            onClick={handleAddDishes}
            className={"my-3 w-25"}
            variant="dark"
            size="md"
          >
            Create
          </Button>
        </div>
        <Accordion>
          {data.map((item, index) => (
            <div key={item._id} className={"dishName"}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <SummaryList />

                <Accordion.Body className={"px-0"}>
                  <div
                    className={
                      "d-flex justify-content-between align-items-center px-3 py-3"
                    }
                  >
                    <Button
                      className="mx-3"
                      onClick={handleAddDishes}
                      className={"w-50"}
                      variant="outline-dark"
                      size="sm"
                      onClick={handleShow}
                    >
                      add
                    </Button>

                    <DropdownButton
                      id="dropdown-basic-button"
                      variant="dark"
                      title="options"
                      size="sm"
                    >
                      <Dropdown.Item>UPDATE</Dropdown.Item>
                      <Dropdown.Item
                        className={"text-danger"}
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        DELETE
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  {item.meals.map((meal) => (
                    <div key={meal.index} className={"dishList py-2"}>
                      <div className={"d-flex justify-content-between"}>
                        <div> {meal.title}</div>

                        <Button
                          onClick={handleAddDishes}
                          className={""}
                          variant="danger"
                          size="sm"
                          className={"mx-3"}
                        >
                          remove
                        </Button>
                      </div>
                      <SummaryList />
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </Container>
      <DeleteConfirm
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <CreateDish
        show={showCreateDishModal}
        onHide={() => setShowCreateDishModal(false)}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Meals />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Dishes;
