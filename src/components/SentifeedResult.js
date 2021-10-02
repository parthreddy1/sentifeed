import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import Lottie from "react-lottie-player";
import angryLottie from "../images/angry.json";
import happyLottie from "../images/happy.json";
import styles from "./SentifeedResult.module.css";
import { ResultContext } from "../context/ResultContext";

import backArrow from "../images/backArrow.svg";

const SentifeedResult = ({ history }) => {
  const [graph, setGraph] = useState({
    positive: 81,
    negative: 15,
  });
  const sentifeed = useContext(ResultContext);

  function handleGoBack() {
    history.push("/");
  }

  useEffect(() => {
    axios
      .get("http://13.233.111.198:5500/test2")
      .then((res) => {
        console.log(res);
        let data = {
          positive: res.data.Positive,
          negative: res.data.Negative,
        };
        console.log(data);
        setGraph(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.backWrapper}>
        <button onClick={handleGoBack}>
          <img src={backArrow} alt="" />
          <p>Enter another response</p>
        </button>
      </div>
      <div className={styles.title}>
        <p>Let's see your result</p>
        <p>
          {`The elements below show the result of your feedback after running
          sentimental analysis on them. The sentiment of your feedback was
           ${sentifeed.result.sentiment}`}
        </p>
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.individualResult}>
          <div className={styles.feedbackContainer}>
            <p>Your entered statement was</p>
            <div className={styles.feedbackStatement}>
              {sentifeed.result.feedback}
            </div>
          </div>
          <div className={styles.individualSentiment}>
            <p>Your individual sentiment</p>
            {/* {sentifeed.result.sentiment === "" ? null : (
              <div className={styles.sentimentDisplay}>
                <Lottie
                  loop
                  animationData={
                    sentifeed.result.sentiment === "positive"
                      ? happyLottie
                      : angryLottie
                  }
                  play
                  className={styles.lottie}
                />
                <p
                  className={
                    sentifeed.result.sentiment === "positive"
                      ? styles.positive
                      : styles.negative
                  }
                >
                  {sentifeed.result.sentiment}
                </p>
              </div>
            )} */}
            
          </div>
        </div>
        <div className={styles.resultGraph}>
          <p>Total Output Graph</p>
          <div className={styles.graphContainer}>
            <div className={styles.piechart}>
              {graph ? (
                <PieChart
                  data={[
                    {
                      title: "Negative",
                      value: graph.negative,
                      color: "#26538e",
                    },
                    {
                      title: "Positive",
                      value: graph.positive,
                      color: "#a6deff",
                    },
                  ]}
                  segmentsShift={3}
                  startAngle={180}
                  radius={45}
                  animate
                />
              ) : null}
            </div>
            <div className={styles.legends}>
              <div className={styles.legend}>
                <div className={styles.legendColor}></div>
                <p>Positive Output</p>
              </div>
              <div className={styles.legend}>
                <div className={styles.legendColor}></div>
                <p>Negative Output</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentifeedResult;
