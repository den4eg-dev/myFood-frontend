import { Accordion, Container } from "react-bootstrap";
import SummaryList from "../summary/SummaryList";
import styles from "./DailyAccordion.module.scss";
import { FiSunrise } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { GiOpenedFoodCan } from "react-icons/gi";

const initialState = [
  {
    title: "Breakfast",
    id: 1,
    component: <FiSunrise />,
    summary: {
      protein: 1445,
      carbs: 423,
      fat: 30,
      calories: 2340,
    },
  },
  {
    title: "Lunch",
    id: 2,
    component: <FiSun />,
    summary: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
  {
    title: "Dinner",
    id: 3,
    component: <FiSunset />,
    summary: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
  {
    title: "Snacks",
    id: 4,
    component: <GiOpenedFoodCan />,
    summary: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
];

const DailyAccordion = ({ data = initialState }) => {
  return (
    <Container>
      <Accordion>
        {data.map((item, i) => (
          <Accordion.Item
            key={item.id}
            className={`${styles.item}`}
            eventKey={i}
          >
            <div className={"d-flex align-items-center ps-2"}>
              {item.component}
              <Accordion.Header className={"flex-grow-1"}>
                {item.title}
              </Accordion.Header>
            </div>
            <SummaryList summary={item.summary} />
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default DailyAccordion;
