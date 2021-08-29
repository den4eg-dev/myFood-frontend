import React, { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../redux/actions/ingredientsAction";
import { Button, Form, ListGroup } from "react-bootstrap";
import SummaryList from "../summary/SummaryList";
import { updateOneDish } from "../../redux/actions/dishesAction";

const IngredientsList = ({ onHide }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.ingredients);
  const { selectedDish } = useSelector((state) => state.dishes);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [weightItemValue, setWeightItemValue] = useState(
    data.reduce((acc, item) => {
      return { ...acc, [item._id]: "" };
    }, {})
  );
  useEffect(() => {
    dispatch(fetchIngredients(search));
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onAddButton = (e, meal) => {
    let { title, _id, calories, carbs, fat, protein } = meal;

    if (!weightItemValue[_id]) return;

    // let arrMeals = [...oneDishData.meals];
    let arrMeals = [...selectedDish.meals];

    const calculate = (oldWeight, newWeight) => {
      const sum = (Number(oldWeight) * Number(newWeight)) / 100;
      return Math.ceil(sum);
    };

    const oneMeal = {
      calories: calculate(calories, weightItemValue[_id]),
      carbs: calculate(carbs, weightItemValue[_id]),
      fat: calculate(fat, weightItemValue[_id]),
      protein: calculate(protein, weightItemValue[_id]),
      title,
      weight: Number(weightItemValue[_id]),
      _id,
    };

    arrMeals.push(oneMeal);

    dispatch(updateOneDish(selectedDish._id, [...arrMeals]));
    onHide();
  };

  const onChangeValue = (e) => {
    const value = e.currentTarget.value;
    // if (!value) e.target.classList.add("border-danger");
    setWeightItemValue({ ...weightItemValue, [e.target.name]: value });
  };
  return (
    <div className={"page"}>
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

      <SummaryList
        summary={{
          protein: "Protein",
          carbs: "Carbs.",
          fat: "Fat",
          calories: "Calories",
        }}
      />
      <ListGroup>
        {data ? (
          [...data].map((meal) => (
            <div key={meal._id}>
              <ListGroup.Item>
                <div className={"row align-items-center"}>
                  <div className={"col-6"}>{meal.title}</div>
                  <div className={"col-4"}>
                    <Form.Control
                      aria-label="Large"
                      name={meal._id}
                      aria-describedby="inputGroup-sizing-sm"
                      value={weightItemValue[meal._id]}
                      type="number"
                      placeholder={"100g"}
                      onChange={onChangeValue}
                    />
                  </div>

                  <div className={"col-2 justify-content-end"}>
                    <Button
                      onClick={(e) => onAddButton(e, meal)}
                      className={"w-100"}
                      variant="primary"
                      size="sm"
                    >
                      +
                    </Button>
                  </div>
                  <p className={"text-danger"}>{error}</p>
                </div>
                <SummaryList
                  summary={{
                    protein: meal.protein,
                    carbs: meal.carbs,
                    fat: meal.fat,
                    calories: meal.calories,
                  }}
                />
              </ListGroup.Item>
            </div>
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </ListGroup>
    </div>
  );
};

export default IngredientsList;
