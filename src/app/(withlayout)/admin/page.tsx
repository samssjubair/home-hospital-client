"use client";
import { authKey } from "@/constants/storage";
import { getBaseUrl, getDefaultDP } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [whoAmI, setWhoAmI] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(`${getBaseUrl()}/users/get-my-info`, {
          headers: {
            Authorization: `${getFromLocalStorage(authKey)}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setWhoAmI(data.data);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);
  const {
    name,
    email,
    role,
    contactNo,
    address,
    profileImg,
    createdAt,
    updatedAt,
  } = whoAmI;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <Image
            src={profileImg || getDefaultDP()}
            alt="User Profile Image"
            className="w-32 h-32 rounded-full mx-auto mb-4"
            height={128}
            width={128}
          />
          <h1 className="text-2xl font-bold">{name}</h1>
        </div>
        <div className="mt-4">
          <p className="text-sm">Email: {email}</p>
          <p className="text-sm">Role: {role}</p>
          <p className="text-sm">Contact: {contactNo}</p>
          <p className="text-sm">Address: {address}</p>
        </div>
        <div className="mt-6 text-sm">
          <p>Created At: {dayjs(createdAt).format("DD-MM-YYYY")}</p>
          <p>Updated At: {dayjs(updatedAt).format("DD-MM-YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
