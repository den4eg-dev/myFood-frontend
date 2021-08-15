import React from "react";
import { Container } from "react-bootstrap";
import styles from "./SummaryList.module.scss";

const initialState = {
  protein: 0,
  carbs: 0,
  fat: 0,
  calories: 0,
};

const SummaryList = ({ daily = false, summary = initialState }) => {
  return (
    <>
      {daily ? (
        <Container>
          <div className={`${styles.list} ${styles.dailyList}`}>
            <div className="row">
              <div className="col">
                <div className={styles.dailyNumbers}>{summary.protein}</div>
                Protein
              </div>
              <div className="col">
                <div className={styles.dailyNumbers}>{summary.carbs}</div>Carbs
              </div>
              <div className="col">
                <div className={styles.dailyNumbers}>{summary.fat}</div>Fat
              </div>
              <div className="col">
                <div className={styles.dailyNumbers}>{summary.calories}</div>
                Calories
              </div>
              <div className="col"></div>
            </div>
          </div>
        </Container>
      ) : (
        <div className={styles.list}>
          <div className="row">
            <div className="col">{summary.protein}</div>
            <div className="col">{summary.carbs}</div>
            <div className="col">{summary.fat}</div>
            <div className="col">{summary.calories}</div>
            <div className="col"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryList;
