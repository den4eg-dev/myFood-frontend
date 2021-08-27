import React, { useEffect, useState } from "react";
import {
  DropdownButton,
  ListGroup,
  Dropdown,
  Button,
  Form,
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
import { URL } from "../api/index";
const imageStyled = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
};

const Meals = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.ingredients);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt:desc");

  // const URL = "http://localhost:5000/";
  // const URL = "https://myfood-backend.herokuapp.com";
  const baseURL = URL();
  useEffect(() => {
    dispatch(fetchIngredients(search, sortBy, page));

    console.log("MEALS RENDER");
  }, [search, sortBy, page, isLoading]);

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

  const onChangeSort = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
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
        <div
          className={"d-flex justify-content-between align-items-center mb-2"}
        >
          <div>
            <label>
              SortBy:
              <Form.Select onChange={onChangeSort} size="sm">
                <option defaultValue={"createdAt:desc"}>date &#9650;</option>
                <option value={"createdAt:asc"}>date &#9660;</option>
                <option value={"title:asc"}>name => ABC</option>
                <option value={"title:desc"}>Name => ZYX </option>
              </Form.Select>
            </label>
          </div>

          <Button onClick={handleCreateItem} variant="dark" size="lg">
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
                          src={baseURL + item.image.path}
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
                            size={"sm"}
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
