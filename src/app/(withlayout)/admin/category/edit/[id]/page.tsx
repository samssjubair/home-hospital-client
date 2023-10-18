"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { authKey } from "@/constants/storage";
import { getBaseUrl, getImageBBKey } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button, Col, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateCategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [categoryData, setCategoryData] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      

      axios
        .get(`${getBaseUrl()}/categories/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setCategoryData(data.data);
          console.log(data.data)
          setImageUrl(data.data.imageUrl);
        });
    };
    fetchData();
  }, [id]);

  //   console.log(categoryData)
  const defaultValues = {
    title: categoryData?.title
  };


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
              data["imageUrl"] = d.data.url;
              delete data["file"];
              data["price"] = parseInt(data.price);
              axios
                .patch(`${getBaseUrl()}/categories/${id}`, data, {
                  headers: {
                    Authorization: `${getFromLocalStorage(authKey)}`,
                  },
                })
                .then((res) => {
                  res.data;
                  message.success("Category Updated Successfully");
                })
                .catch((err) => {
                  console.error(err.message);
                  message.error(err.message);
                });
            }
          })
          .catch((err) => message.error("Image Upload Failed"));
      } else {
        data["imageUrl"] = imageUrl;
        delete data["file"];
        axios
          .patch(`${getBaseUrl()}/categories/${id}`, data, {
            headers: {
              Authorization: `${getFromLocalStorage(authKey)}`,
            },
          })
          .then((res) => {
            res.data;
            message.success("Category Updated Successfully");
          })
          .catch((err) => {
            console.error(err.message);
            message.error(err.message);
          });
      }
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
          { label: "category", link: `/${base}/category` },
        ]}
      />
      <h1>Update Category</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>

            
            <div style={{ margin: "10px 0px" }}>
              <UploadImage name="file" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add Service
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
