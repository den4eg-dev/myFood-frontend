import styles from "./Footer.module.scss";
import { BiFoodMenu } from "react-icons/bi";
import { GiHotMeal } from "react-icons/gi";
import { BiHomeAlt } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { NavLink, useHistory } from "react-router-dom";
import {
  CHAT_ROUTE,
  DISHES_ROUTE,
  HOME_ROUTE,
  MEALS_ROUTE,
} from "../../utils/routeConsts";

const Footer = () => {
  const history = useHistory();
  console.log(history);

  return (
    <footer className={`${styles.footer} bg-dark`}>
      <div className="row">
        <div className="col-3 g-0">
          <NavLink activeClassName={styles.active} to={HOME_ROUTE}>
            <ul>
              <li>
                <BiHomeAlt />
              </li>
              <li>Home</li>
            </ul>
          </NavLink>
        </div>
        <div className="col-3 g-0">
          <NavLink activeClassName={styles.active} to={DISHES_ROUTE}>
            <ul>
              <li>
                <GiHotMeal />
              </li>
              <li>Dishes</li>
            </ul>
          </NavLink>
        </div>
        <div className="col-3 g-0">
          <NavLink activeClassName={styles.active} to={MEALS_ROUTE}>
            <ul>
              <li>
                <BiFoodMenu />
              </li>
              <li>Meals</li>
            </ul>
          </NavLink>
        </div>

        <div className="col-3 g-0">
          <NavLink activeClassName={styles.active} to={CHAT_ROUTE}>
            <ul>
              <li>
                <BsChatDots />
              </li>
              <li>Chat</li>
            </ul>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
