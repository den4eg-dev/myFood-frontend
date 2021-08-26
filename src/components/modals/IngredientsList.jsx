import React, { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../redux/actions/ingredientsAction";
import { Button, Form, ListGroup } from "react-bootstrap";
import SummaryList from "../summary/SummaryList";
import { updateOneDish } from "../../redux/actions/dishesAction";

const IngredientsList = ({ oneDishData, onHide }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.ingredients);
  const [search, setSearch] = useState("");
  const [targetValueName, setTargetValueName] = useState("");

  const [weightItem, setWeightItem] = useState(
    data.reduce((acc, item) => {
      return { ...acc, [item._id]: "100" };
    }, {})
  );

  useEffect(() => {
    dispatch(fetchIngredients(search));
    console.log("INGREDIENTS_LIST RENDER");
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onAddButton = (e, meal) => {
    const arr = [];
    let arrMeals = [...oneDishData.meals];
    let { title, _id, calories, carbs, fat, protein } = meal;

    const calculate = (oldWeight, newWeight) => {
      const sum = (Number(oldWeight) * Number(newWeight)) / 100;
      return Math.ceil(sum);
    };

    const oneMeal = {
      calories: calculate(calories, weightItem[_id]),
      carbs: calculate(carbs, weightItem[_id]),
      fat: calculate(fat, weightItem[_id]),
      protein: calculate(protein, weightItem[_id]),
      title,
      weight: Number(weightItem[_id]),
      _id,
    };
    arrMeals.push(oneMeal);
    // TODO 100 pro need to be REFACTORED
    const sumProtein = arrMeals.reduce((sum, item) => {
      return sum + Number(item.protein);
    }, 0);
    const sumFat = arrMeals.reduce((sum, item) => {
      return sum + Number(item.fat);
    }, 0);
    const sumCalorie = arrMeals.reduce((sum, item) => {
      return sum + Number(item.calories);
    }, 0);
    const sumCarbs = arrMeals.reduce((sum, item) => {
      return sum + Number(item.carbs);
    }, 0);

    // arr.push(summary);
    const summary = {
      protein: sumProtein,
      fat: sumFat,
      calories: sumCalorie,
      carbs: sumCarbs,
    };

    arr.push(summary);
    arr.push(arrMeals);

    dispatch(updateOneDish(oneDishData._id, [...arr]));
    onHide();
  };
  const onChangeValue = (e) => {
    const value = e.currentTarget.value;
    setWeightItem({ ...weightItem, [e.target.name]: value });
    setTargetValueName(e.target.name);
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
                      value={weightItem[meal._id]}
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
