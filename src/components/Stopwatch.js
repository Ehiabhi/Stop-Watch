import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

function Stopwatch() {
  const [timeState, setTimeState] = useState({
    status: false,
    ms: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    durationStart: {
      ms: null,
      seconds: null,
      minutes: null,
      hours: null,
    },
    recordLap: false,
  });

  let [constants, setConstants] = useState({
    stopms: null,
    stopSeconds: null,
    stopMinutes: null,
    stopHours: null,
  });
  const [lapArray, setLapArray] = useState([]);

  useEffect(() => {
    updateLapUI();
  }, [lapArray]);

  const handleClick = () => {
    changeStatus();
    if (timeState.status) {
      clearInterval(constants.stopms);
      clearInterval(constants.stopSeconds);
      clearInterval(constants.stopMinutes);
      clearInterval(constants.stopHours);
    } else {
      if (!timeState.recordLap) {
        setTimeState((prevState) => {
          return {
            ...prevState,
            durationStart: {
              ms: 0,
              seconds: 0,
              minutes: 0,
              hours: 0,
            },
            recordLap: !prevState.recordLap,
          };
        });
      }
      setConstants((prevState) => {
        return {
          ...prevState,
          stopms: setInterval(changeMs, 1),
        };
      });
      setConstants((prevState) => {
        return {
          ...prevState,
          stopSeconds: setInterval(changeSeconds, 1000),
        };
      });
      setConstants((prevState) => {
        return {
          ...prevState,
          stopMinutes: setInterval(changeMinutes, 60000),
        };
      });
      setConstants((prevState) => {
        return {
          ...prevState,
          stopHours: setInterval(changeHours, 3600000),
        };
      });
    }
  };

  const handleLap = () => {
    const lap = document.querySelector("#lap");
    const cover = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    span1.style.color = "#999";
    span1.innerHTML =
      "# " +
      (lap.childNodes.length + 1).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " ";
    span2.innerHTML =
      " | " +
      timeState.hours.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      timeState.minutes.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      timeState.seconds.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      timeState.ms.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    span3.innerHTML =
      " | " +
      Math.abs(
        Number(timeState.hours - timeState.durationStart.hours)
      ).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      Math.abs(
        Number(timeState.minutes - timeState.durationStart.minutes)
      ).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      Math.abs(
        Number(timeState.seconds - timeState.durationStart.seconds)
      ).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " : " +
      Math.abs(
        Number(timeState.ms - timeState.durationStart.ms)
      ).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    cover.appendChild(span1);
    cover.appendChild(span2);
    cover.appendChild(span3);

    setLapArray((prevState) => {
      return [cover, ...prevState];
    });

    setTimeState((prevState) => {
      return {
        ...prevState,
        durationStart: {
          ms: timeState.ms,
          seconds: timeState.seconds,
          minutes: timeState.minutes,
          hours: timeState.hours,
        },
      };
    });
  };

  const changeStatus = () => {
    return setTimeState((prevState) => {
      return { ...prevState, status: !prevState.status };
    });
  };

  const changeMs = () => {
    return setTimeState((prevState) => {
      if (prevState.ms === 99) {
        return { ...prevState, ms: 0 };
      } else {
        return { ...prevState, ms: prevState.ms + 1 };
      }
    });
  };

  const changeSeconds = () => {
    return setTimeState((prevState) => {
      if (prevState.seconds === 59) {
        return { ...prevState, seconds: 0 };
      } else {
        return { ...prevState, seconds: prevState.seconds + 1 };
      }
    });
  };

  const changeMinutes = () => {
    return setTimeState((prevState) => {
      if (prevState.seconds === 59) {
        return { ...prevState, minutes: 0 };
      } else {
        return { ...prevState, minutes: prevState.minutes + 1 };
      }
    });
  };

  const changeHours = () => {
    return setTimeState((prevState) => {
      return { ...prevState, hours: prevState.hours + 1 };
    });
  };

  const handleReset = () => {
    clearInterval(constants.stopms);
    clearInterval(constants.stopSeconds);
    clearInterval(constants.stopMinutes);
    clearInterval(constants.stopHours);
    setLapArray([]);
    document.querySelector("#lap").innerHTML = "";
    setTimeState({
      status: false,
      ms: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      durationStart: {
        ms: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
      },
    });
  };

  const updateLapUI = () => {
    debugger;
    lapArray.forEach((cover) => {
      document.getElementById("lap").appendChild(cover);
    });
  };

  return (
    <>
      <div id="time">
        <div id="h1_border">
          <h1>
            {timeState.hours.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}{" "}
            :{" "}
            {timeState.minutes.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}{" "}
            :{" "}
            {timeState.seconds.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}{" "}
            <span>
              {timeState.ms.toLocaleString(undefined, {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </span>
          </h1>
        </div>
      </div>
      <div id="lap"></div>
      <div id="button_div">
        <Button
          style={{
            display:
              (timeState.hours === 0) &
              (timeState.minutes === 0) &
              (timeState.seconds === 0) &
              (timeState.ms === 0)
                ? "none"
                : "inline-block",
          }}
          className="but"
          variant="contained"
          color="primary"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          className="but"
          variant="contained"
          color={timeState.status ? "primary" : "secondary"}
          onClick={handleClick}
        >
          {timeState.status === false ? "Start" : "Pause"}
        </Button>
        <Button
          style={{
            display:
              (timeState.hours === 0) &
                (timeState.minutes === 0) &
                (timeState.seconds === 0) &
                (timeState.ms === 0) ||
              !timeState.status ||
              lapArray.length > 98
                ? "none"
                : "inline-block",
          }}
          className="but"
          variant="contained"
          color="primary"
          onClick={handleLap}
        >
          Lap
        </Button>
      </div>
    </>
  );
}

export default Stopwatch;
