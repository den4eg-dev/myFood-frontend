import SummaryList from "../components/summary/SummaryList";
import DailyAccordion from "../components/dailyAccordion/DailyAccordion";

const Home = () => {
  return (
    <div className={"page"}>
      <SummaryList daily />
      <DailyAccordion />
    </div>
  );
};

export default Home;
