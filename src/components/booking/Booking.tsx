import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import Stepper from "../ui/Steps";
import axios from "axios";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { message } from "antd";

const BookingCard = ({ booking }: { booking: any }) => {
  const { service, status } = booking; // Destructure the service object and status from the booking
  // const [isCancelled, setIsCancelled] = useState(false);

  // Function to cancel the order
  const cancelOrder = async () => {
    axios.delete(`${getBaseUrl()}/bookings/${booking.id}`, {
      headers: {
        Authorization: `${getFromLocalStorage(authKey)}`,
      },
    })
    .then((res) => {
      res.data;
      // message.success("Booking Cancelled Successfully").then(() => window.location.reload());
      message.success("Booking Cancelled Successfully").then(() => window.location.reload());
      // setIsCancelled(true);
    })
    .catch((err) => {
      message.error("Booking Cancelled Failed");
      console.error(err.message);
    });

  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
      <p className="text-gray-600 mb-2">
        Booking Date: {dayjs(booking.appointment).format("DD-MM-YYYY hh:mm A")}
      </p>
      <p className="text-gray-600">Price: ${service.price}</p>
      <p className="text-gray-600">Organization: {service.organization}</p>
      <p className="text-gray-600">Subcategory: {service.subCategory}</p>
      <p className="text-gray-600">Description: {service.description}</p>
      <div className="my-4">
        <Stepper status={status} />
      </div>

      {/* Render the "Cancel Order" button if the order is not cancelled */}
     
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={cancelOrder}
        >
          Cancel Order
        </button>
     
      {service.imageUrl && (
        <Image
          src={service.imageUrl}
          alt="Service Image"
          className="w-full mt-2"
          height={128}
          width={128}
        />
      )}
    </div>
  );
};

export default BookingCard;
