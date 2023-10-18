import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import Stepper from "../ui/Steps";

const BookingCard = ({ booking }: { booking: any }) => {
  const { service } = booking; // Destructure the service object from the booking

  

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
      <p className="text-gray-600 mb-2">
        Booking Date: {dayjs(booking.appointment).format("DD-MM-YYYY hh:mm A")}
      </p>
      <p className="text-gray-600">Price: ${service.price}</p>
      <p className="text-gray-600">Organization: {service.organization}</p>
      <p className="text-gray-600">Subcategory: {service.subCategory}</p>
      <p className="text-gray-600">Organization: {service.organization}</p>
      <p className="text-gray-600">Description: {service.escription}</p>
      <div className="my-4">
        <Stepper status={booking.status}/>
      </div>

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
