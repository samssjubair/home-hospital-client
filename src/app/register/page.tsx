"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { signupSchema } from "@/schemas/signup";
import { getFromLocalStorage } from "@/utils/local-storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import loginImage from "@/assets/login.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { StyleProvider } from "@ant-design/cssinjs";

type FormValues = {
  email: string;
  password: string;
  name: string;
  contactNo: string;
  address: string;
  file: File;
};

const SignUpPage = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    message.loading("Creating.....");
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
              data["role"] = "user";
              delete data["file"];
              axios
                .post(`${getBaseUrl()}/auth/signup`, data)
                .then((res) => {
                  res.data;
                  message
                    .success("User Created Successfully")
                    .then(() => router.push("/login"));
                })
                .catch((err) => {
                  console.error(err.message);
                  message.error(err.message);
                });
            }
          })
          .catch((err) => message.error("Image Upload Failed"));
      } else {
        data["role"] = "user";
        delete data["file"];
        axios
          .post(`${getBaseUrl()}/auth/signup`, data)
          .then((res) => {
            res.data;
            message
              .success("User Created Successfully")
              .then(() => router.push("/login"));
          })
          .catch((err) => {
            console.error(err.message);
            message.error(err.message);
          });
      }
    } catch (error) {
      message.error("Image Upload Failed");
      //  message.error(error.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <h1
          className="text-4xl text-center"
          style={{
            margin: "15px 0px",
          }}
        >
          Sign up to get started
        </h1>
        <div>
          {/* <StyleProvider hashPriority="high"> */}
          <Form submitHandler={onSubmit} resolver={yupResolver(signupSchema)}>
            <Row
              gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
              style={{ padding: "0 24px" }}
            >
              <Col span={24} style={{ margin: "10px 0" }}>
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
            <Button className="ms-6 mb-6" type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form>
          {/* </StyleProvider> */}
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPage;
