"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button, Col, Row, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ChangeBookingInfo = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [bookingDetail, setBookingDetail] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(`${getBaseUrl()}/bookings/${id}`, {
          headers: {
            Authorization: `${getFromLocalStorage(authKey)}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setBookingDetail(data.data);
          setIsLoading(false);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const base = "admin";
//   console.log(bookingDetail);

  const defaultValues = {
    appointment: bookingDetail?.appointment,
  };
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit = async (data: any) => {
    message.loading("Updating.....");
    data.appointment = dayjs(data.appointment).toISOString();
    axios
      .patch(`${getBaseUrl()}/bookings/${bookingDetail.id}`, data, {
        headers: {
          Authorization: `${getFromLocalStorage(authKey)}`,
        },
      })
      .then((res) => {
        res.data;
        message.success("Admin info Updated Successfully");
      })
      .catch((err) => {
        console.error(err.message);
        message.error(err.message);
      });
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "booking", link: `/${base}/booking` },
        ]}
      />
      <h1>Update Appointment Time</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="appointment" label="Appointment" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default ChangeBookingInfo;
