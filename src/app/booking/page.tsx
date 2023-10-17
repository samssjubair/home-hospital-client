"use client"
import SelectableCalendar from '@/components/ui/Calendar';
import { authKey } from '@/constants/storage';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { getUserInfo } from '@/services/auth.service';
import { getFromLocalStorage } from '@/utils/local-storage';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const BookingPage = ({searchParams}: {searchParams: {service: string}}) => {
    const {service} = searchParams;
    const router = useRouter();
    const [value, setValue] = useState(() => dayjs());
    const userInfo = getUserInfo() as any;
    const handleConfirm = () => {
        const payload = {
          userId: userInfo.id,
          serviceId: service,
          appointment: dayjs(value).toISOString(),
        };
        const res= axios.post(`${getBaseUrl()}/bookings/create-booking`,payload,{
            headers: {
                Authorization: `${getFromLocalStorage(authKey)}`,
            },
        })
        .then((res) => {
             Swal.fire(
               "Success!",
               "You successfully booked the service! Go to dashboard to track your booking",
               "success"
             ).then(() => router.push("/user/bookings"));
        })
        .catch((err) => {
          Swal.fire("Error!", "Something went wrong, can't place order", "error");
        });
       
    }
    return (
      <div className='p-4 m-4'>
        <div className="w-1/2 ">
          <h2 className="text-2xl my-4 text-pink-900 ">
            Please select a date for your booking:{" "}
          </h2>
          <SelectableCalendar value={value} setValue={setValue} />
        </div>
        <button className="bg-pink-700 text-white px-4 py-2 my-2  rounded-md ms-0" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>
    );
};

export default BookingPage;