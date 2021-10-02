import React, { useState, useEffect, useContext } from "react";
import styles from "./SentifeedForm.module.css";
import Lottie from "react-lottie-player";
import lottieFile from "../images/lottie.json";
import { ResultContext } from "../context/ResultContext";
import axios from "axios";
import formBackgroundElement from "../images/formBackgroundElement.svg";

const SentimentsForm = ({ history }) => {
  const [feedback, setFeedback] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const sentifeed = useContext(ResultContext);

  function handleChangeFeedback(e) {
    setFeedback(e.target.value);
    setIsButtonDisabled(false);
  }

  function handleClearFeedback() {
    setFeedback("");
    setIsButtonDisabled(true);
  }

  function handleFeedbackSubmit(e) {
    e.preventDefault();
    // axios
    //   .post(`http://13.233.111.198:5500/test/${feedback}`)
    //   .then((res) => {
    //     console.log(res);
    //     let data = {
    //       sentiment: res.data.ModelResponse,
    //       feedback: feedback,
    //     };
    //     sentifeed.handleResult(data);
    //     history.push("/result");
    //   })
    //   .catch((err) => console.log(err));
    let data = {
            sentiment: "positive",
            feedback: "positivei",
          };
    sentifeed.handleResult(data);
    history.push("/result");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p>Know your sentiments</p>
          <p>
            An approach to bind NLP and ML together to detect the emotions and
            sentiments of a person through textual format
          </p>
        </div>
        <div className={styles.formContainer}>
          <img src={formBackgroundElement} alt="" />
          <p>Please enter your statement</p>
          <form>
            <textarea
              value={feedback}
              onChange={handleChangeFeedback}
              name="feedback"
            ></textarea>
            <div className={styles.controller}>
              <button type="button" onClick={handleClearFeedback}>
                Clear
              </button>
              <button
                type="submit"
                onClick={handleFeedbackSubmit}
                style={{
                  backgroundColor: isButtonDisabled ? "#868686" : "#26538e",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.lottieContainer}>
        <Lottie
          loop
          animationData={lottieFile}
          play
          className={styles.lottie}
        />
      </div>
    </div>
  );
};

export default SentimentsForm;
