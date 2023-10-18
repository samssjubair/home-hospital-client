"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button, Col, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ChangeUserInfo = () => {
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
  const base = "admin";

  const defaultValues = {
    name: whoAmI?.name,
    email: whoAmI?.email,
    contactNo: whoAmI?.contactNo,
    address: whoAmI?.address,

  }
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit = async (data: any) => {
     message.loading("Updating.....");
     try {
       if (data.file) {
         let body = new FormData();
         body.set("key", process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY as string);
         body.append("image", data.file);


         const imgBbUrl = "https://api.imgbb.com/1/upload";
         axios
           .post(imgBbUrl, body)
           .then((res) => res.data)
           .then((d) => {
             // Update imageUrl here, only when the image upload is successful
             setImageUrl(d.data.url);

             // Continue with your patch request or other actions
             if (d.data.url) {
               data["profileImg"] = d.data.url;
               data['role']="admin"
               delete data["file"];
               axios
                 .patch(`${getBaseUrl()}/users/${whoAmI.id}`, data, {
                   headers: {
                     Authorization: `${getFromLocalStorage(authKey)}`,
                   },
                 })
                 .then((res) => {
                   res.data;
                   message.success("User Info Updated Successfully");
                 })
                 .catch((err) => {
                   console.error(err.message);
                   message.error(err.message);
                 });
             }
           })
           .catch((err) => message.error("Image Upload Failed"));
       } else {
         data["profileImg"] = imageUrl;
         data['role']="admin"
         delete data["file"];
         axios
           .patch(`${getBaseUrl()}/users/${whoAmI.id}`, data, {
             headers: {
               Authorization: `${getFromLocalStorage(authKey)}`,
             },
           })
           .then((res) => {
             res.data;
             message.success("User info Updated Successfully");
           })
           .catch((err) => {
             console.error(err.message);
             message.error(err.message);
           });
       }
     } catch (error) {
       message.error("Image Upload Failed");
     }
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "change info", link: `/${base}/change-info` },
        ]}
      />
      <h1>Update Category</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="name" label="Name" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="email" label="Email" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="contactNo" label="Phone" />
            </div>
            <div>
              <FormTextArea name="address" label="Address" />
            </div>
            <div>
              <FormInput name="password" label="Password" type="password" />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <UploadImage name="file" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update Info
        </Button>
      </Form>
    </div>
  );
};

export default ChangeUserInfo;
