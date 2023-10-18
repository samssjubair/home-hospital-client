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

const UpdateCategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [categoryData, setCategoryData] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${getBaseUrl()}/cms/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setCategoryData(data.data);
          // console.log(data.data);
        });
    };
    fetchData();
  }, [id]);

  //   console.log(categoryData)
  const defaultValues = {
    title: categoryData?.title,
    content: categoryData?.content,
  };


  const onSubmit = async (data: any) => {
    message.loading("Updating.....");
    try {
        data['contentType']="faq"
              axios
                .patch(`${getBaseUrl()}/cms/${id}`, data, {
                  headers: {
                    Authorization: `${getFromLocalStorage(authKey)}`,
                  },
                })
                .then((res) => {
                  res.data;
                  message.success("FAQ Updated Successfully");
                })
                .catch((err) => {
                  console.error(err.message);
                  message.error(err.message);
                });
            }
    catch{
        message.error("FAQ Update Failed");
    }
            
          
  };

  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "content", link: `/${base}/content` },
          { label: "faq", link: `/${base}/content/faq` },
        ]}
      />
      <h1>Update FAQ</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormTextArea name="content" label="Content" rows={5} />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update FAQ
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
