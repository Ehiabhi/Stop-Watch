import React, { useState, useEffect } from "react";

export default function Clock() {
  const [timeState, setTimeState] = useState({
    clock: {
      date:
        new Date().getDay() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
      ms: new Date().getMilliseconds(),
    },
  });

  useEffect(() => {
    setInterval(clockUpdate, 1);
  }, []);

  const clockUpdate = () => {
    setTimeState((prevState) => {
      return {
        ...prevState,
        clock: {
          date:
            new Date().getDay() +
            dayChar(new Date().getDay()) +
            " " +
            new Date().toLocaleString("default", { month: "short" }) +
            ", " +
            new Date().getFullYear(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds(),
          ms: new Date().getMilliseconds(),
        },
      };
    });
  };

  function dayChar(val) {
    switch (Number(val)) {
      case 3 || 23:
        return "rd";
      case 2 || 22:
        return "nd";
      case 1 || 21:
        return "st";
      default:
        return "th";
    }
  }
  return (
    <>
      <h1 id="right" className="appClock">
        {timeState.clock.date}
      </h1>
      <h1 id="left" className="appClock">
        {timeState.clock.hours.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
          ":" +
          timeState.clock.minutes.toLocaleString(undefined, {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          ":" +
          timeState.clock.seconds.toLocaleString(undefined, {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
      </h1>
    </>
  );
}
