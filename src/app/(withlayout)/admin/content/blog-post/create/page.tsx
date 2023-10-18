"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storage";
import { getBaseUrl, getImageBBKey } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button, Col, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateBlogPostPage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const onSubmit = async (data: any) => {
    message.loading("Creating.....");

    try {
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

          // Continue with your post request or other actions
          if (d.data.url) {
            data["imageUrl"] = d.data.url;
            data["contentType"]="blog_post"
            delete data["file"];
            axios
              .post(`${getBaseUrl()}/cms/create-cms`, data, {
                headers: {
                  Authorization: `${getFromLocalStorage(authKey)}`,
                },
              })
              .then((res) => res.data)
              .then((data) => message.success("Blog Post Created Successfully"));
          }
        })
        .catch((err) => message.error("Image Upload Failed"));
    } catch (error) {
      message.error("Image Upload Failed");
    }
  };
  
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "content", link: `/${base}/content` },
          { label: "blog post", link: `/${base}/content/blog-post` },
        ]}
      />
      <h1>Create Category</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormTextArea name="content" label="content" rows={8} />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <UploadImage name="file" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add Category
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlogPostPage;
