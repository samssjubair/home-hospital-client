"use client"
import BookingCard from "@/components/booking/Booking";
import { authKey } from "@/constants/storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const BookingTrackPage = () => {
    const [allBookings, setAllBookings] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(`${getBaseUrl()}/bookings/get-my-booking`,{
                    headers:{
                        Authorization: getFromLocalStorage(authKey),
                    }
                })
                .then((res) => res.data)
                .then((data) => {
                    setAllBookings(data.data);
                    // console.log(data.data)
                });
        }
        fetchData() 
    },[])
    // console.log(allBookings )
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {allBookings.map((booking: any) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    );
};

export default BookingTrackPage;