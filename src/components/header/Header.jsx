import { Container, Navbar } from "react-bootstrap";
import logo from "../../assets/images/fast-food.png";
import { BsCalendar } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/routeConsts";
import DatePicker from "react-datepicker";
import styles from "./Header.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { format } from "date-fns";

const Header = () => {
  let location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const dateNow = new Date().toLocaleDateString();
  const dateShow = startDate.toLocaleDateString();

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    // console.log(e.currentTarget.nextElementSibling);
    // e.target.nextElementSibling.classList.add("calPicker");
  };

  return (
    <header className={"position-relative w-100"}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className={"w-100"} href="#home">
            <div>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="me-3 d-inline-block align-center"
              />
              <h3 className={"fs-5 d-inline-block"}>myFood</h3>
            </div>

            {location.pathname === HOME_ROUTE && (
              <div className={"d-flex w-100 justify-content-end"}>
                <div className="w-100 d-flex justify-content-end">
                  <BsCalendar className={"me-2 fs-5"} />
                  <button
                    onClick={handleClick}
                    className={`example-custom-input ${styles.calenderBtn}`}
                  >
                    {dateNow === dateShow
                      ? "Today"
                      : format(startDate, "dd-MM-yyyy")}
                  </button>
                  {isOpen && (
                    <div
                      className={`example-custom-input w-100 bg-dark ${styles.calenderModal}`}
                    >
                      <DatePicker
                        className="position-absolute"
                        closeOnScroll={(e) => e.target === document}
                        selected={startDate}
                        onChange={handleChange}
                        inline
                      />
                    </div>
                  )}
                </div>
                {/*<BsFillCaretDownFill />*/}
              </div>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
