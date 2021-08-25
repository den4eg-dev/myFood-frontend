import React, { useEffect, useState } from "react";
import {
  DropdownButton,
  ListGroup,
  Dropdown,
  Button,
  Container,
} from "react-bootstrap";
import SummaryList from "../components/summary/SummaryList";
import { BsSearch } from "react-icons/bs";
import UpdateIngredient from "../components/modals/UpdateIngredients";
import DeleteConfirm from "../components/modals/DeleteConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  setOneItemData,
} from "../redux/actions/ingredientsAction";
import CreateIngredient from "../components/modals/CreateIngredients";
import dummyImg from "../assets/images/dummy.jpg";

const imageStyled = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
};

const Meals = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.ingredients);
  const [search, setSearch] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const URL = "http://localhost:5000/";

  useEffect(() => {
    dispatch(fetchIngredients(search));
    console.log("MEALS RENDER");
  }, [search, isLoading]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdateItem = (item) => {
    dispatch(setOneItemData(item));
    setShowUpdateModal(true);
  };
  const handleDeleteItem = (item) => {
    dispatch(setOneItemData(item));
    setShowDeleteModal(true);
  };

  const handleCreateItem = () => {
    setShowCreateModal(true);
  };
  return (
    <div className={"page"}>
      <Container>
        <h1 className={"m-3"}>MEALS</h1>
        <div className="input-group flex-nowrap mb-5">
          <span className="input-group-text" id="addon-wrapping">
            <BsSearch />
          </span>
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className={"d-flex justify-content-end mb-2"}>
          <Button onClick={handleCreateItem} variant="primary" size="lg">
            +
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
        <ListGroup>
          {data.length ? (
            data.map((item) => (
              <div key={item._id} className={"mb-2"}>
                <ListGroup.Item>
                  <div className={"d-inline-flex mb-2 w-100"}>
                    <div className={"me-2"}>
                      {item.image ? (
                        <img
                          style={imageStyled}
                          src={URL + item.image.path}
                          alt={item.image.original}
                        />
                      ) : (
                        <img
                          style={imageStyled}
                          src={dummyImg}
                          alt={"dummy image"}
                        />
                      )}
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>{item.title}</h5>
                        <span>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title="options"
                          >
                            <Dropdown.Item
                              onClick={() => handleUpdateItem(item)}
                            >
                              UPDATE
                            </Dropdown.Item>
                            <Dropdown.Item
                              className={"text-danger"}
                              onClick={() => handleDeleteItem(item)}
                            >
                              DELETE
                            </Dropdown.Item>
                          </DropdownButton>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={"text-primary"}>in 100g</div>
                  <SummaryList
                    summary={{
                      protein: item.protein,
                      fat: item.fat,
                      calories: item.calories,
                      carbs: item.carbs,
                    }}
                  />
                </ListGroup.Item>
              </div>
            ))
          ) : (
            <h4>Nothing here</h4>
          )}
        </ListGroup>
      </Container>

      <UpdateIngredient
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
      />
      <DeleteConfirm
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <CreateIngredient
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Meals;
