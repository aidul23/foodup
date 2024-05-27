import React from "react";

export default function Clock() {
  var currentdate = new Date();
  var time = currentdate.getHours();

  function timeMessage(time) {
    if(time >= 0 && time <= 6) {
      return "Kill your midnight hunger!"
    } else if(time > 6  && time <= 11) {
      return "Anything for fast your break?"
    } else if(time > 11 && time <= 2) {
      return "Its lunch time! feed your belly"
    } else if(time > 2 && time <= 7) {
      return "Snacks is all yours!"
    } else {
      return "Lets order a dinner for your partner!"
    }
  }
  return <div>{timeMessage(time)}</div>;
}
