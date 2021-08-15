import SummaryList from "../components/summary/SummaryList";
import DailyAccordion from "../components/dailyAccordion/DailyAccordion";

const Home = () => {
  return (
    <>
      <SummaryList daily />
      <DailyAccordion />
    </>
  );
};

export default Home;
