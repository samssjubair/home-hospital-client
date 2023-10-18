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

const UpdateBlogPostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [categoryData, setCategoryData] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${getBaseUrl()}/cms/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setCategoryData(data.data);
          console.log(data.data);
        });
    };
    fetchData();
  }, [id]);

  //   console.log(categoryData)
  const defaultValues = {
    title: categoryData?.title,
    content: categoryData?.content,
  };

//   const onSubmit = async (data: any) => {
//     message.loading("Updating.....");
//     try {
//       data["contentType"] = "faq";
//       axios
//         .patch(`${getBaseUrl()}/cms/${id}`, data, {
//           headers: {
//             Authorization: `${getFromLocalStorage(authKey)}`,
//           },
//         })
//         .then((res) => {
//           res.data;
//           message.success("FAQ Updated Successfully");
//         })
//         .catch((err) => {
//           console.error(err.message);
//           message.error(err.message);
//         });
//     } catch {
//       message.error("FAQ Update Failed");
//     }
//   };

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
            setImageUrl(d.data.url);

            if (d.data.url) {
              data["imageUrl"] = d.data.url;
              data["contentType"] = "blog_post";
              delete data["file"];
              axios
                .patch(`${getBaseUrl()}/cms/${id}`, data, {
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
        data["contentType"] = "blog_post";
        delete data["file"];
        axios
          .patch(`${getBaseUrl()}/cms/${id}`, data, {
            headers: {
              Authorization: `${getFromLocalStorage(authKey)}`,
            },
          })
          .then((res) => {
            res.data;
            message.success("Blog post Updated Successfully");
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
          { label: "content", link: `/${base}/content` },
          { label: "blog post", link: `/${base}/content/blog-post` },
        ]}
      />
      <h1>Update Blog Post</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormTextArea name="content" label="Content" rows={5} />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <UploadImage name="file" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update Blog Post
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBlogPostPage;
