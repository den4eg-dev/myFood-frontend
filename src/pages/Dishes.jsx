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
import {
  deleteOneDish,
  fetchDishes,
  setOneDish,
  updateOneDish,
} from "../redux/actions/dishesAction";
import CreateDish from "../components/modals/CreateDish";
import DeleteConfirm from "../components/modals/DeleteConfirm";
import IngredientsList from "../components/modals/IngredientsList";

const Dishes = () => {
  const { data } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  const [showCreateDishModal, setShowCreateDishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [oneDish, setOneDish] = useState(null);

  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(fetchDishes());
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    dispatch(setOneDish(item));
    setShow(true);
  };
  const handleCreateDishes = () => {
    setShowCreateDishModal(true);
  };
  const handleDeleteItem = (id) => {
    dispatch(deleteOneDish(id));
  };

  const removeItemFromDish = (dish, meal) => {
    const arrMeals = dish.meals.filter((m) => m._id !== meal._id);

    dispatch(updateOneDish(dish._id, [...arrMeals]));
  };

  return (
    <div className={"page"}>
      <Container>
        <h1>DISHES</h1>
        <div className={"d-flex justify-content-end"}>
          <Button
            onClick={handleCreateDishes}
            className={"my-3 w-25"}
            variant="dark"
            size="md"
          >
            Create
          </Button>
        </div>
        <SummaryList
          summary={{
            protein: "Protein",
            carbs: "Carbs.",
            fat: "Fat",
            calories: "Calories",
          }}
        />
        <Accordion>
          {data &&
            data.map((dish, index) => (
              <div key={dish._id} className={"dishName mb-2"}>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{dish.title}</Accordion.Header>
                  <SummaryList bold summary={{ ...dish.summary }} />

                  <Accordion.Body className={"px-0"}>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center px-3 py-3"
                      }
                    >
                      <Button
                        className={"w-50 mx-3"}
                        variant="outline-dark"
                        size="sm"
                        onClick={() => handleShow(dish)}
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
                          onClick={() => handleDeleteItem(dish._id)}
                        >
                          DELETE
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    {dish.meals &&
                      dish.meals.map((meal) => (
                        <div key={meal._id} className={"dishList py-2"}>
                          <div className={"d-flex justify-content-between"}>
                            <div> {meal.title}</div>

                            <Button
                              onClick={() => removeItemFromDish(dish, meal)}
                              variant="danger"
                              size="sm"
                              className={"mx-3"}
                            >
                              remove
                            </Button>
                          </div>
                          <SummaryList
                            summary={{
                              protein: meal.protein,
                              carbs: meal.carbs,
                              fat: meal.fat,
                              calories: meal.calories,
                            }}
                          />
                          <p className={"text-success mx-1"}>
                            in {meal.weight} gramm
                          </p>
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
          <Offcanvas.Title>List of Meals</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <IngredientsList onHide={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Dishes;
