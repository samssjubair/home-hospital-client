import React from "react";
import { Steps } from "antd";
import Item from "antd/es/list/Item";

const Stepper = ({status}: {status: string}) => {
     const items = [
       { title: "booked", description: "Your order has been placed." },
       {
         title: "processing",
         description: "We are processing your order.",
       },
       {
         title: "completed",
         description: "We are processing your order.",
       },
       {
         title: "cancelled",
         description: "We are sorry your order has been cancelled.",
       },
     ];

     const findCurrent = items.findIndex((item) => item.title === status);
     
  return (
  <Steps
    direction="vertical"
    size="small"
    current={findCurrent}
    items={items}
  />
)};

export default Stepper;
