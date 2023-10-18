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

const UpdateServicePage = ({params}: {params: {id: string}}) => {
    const {id}= params;
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any>({});
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${getBaseUrl()}/categories`)
        .then((res) => res.data)
        .then((data) => {
          setAllCategories(data.data);
          setIsLoading(false);
          setMeta(data.meta);
        });

      axios.get(`${getBaseUrl()}/services/${id}`)
        .then((res)=>res.data)
        .then((data)=>{
            setServiceData(data.data)
            setImageUrl(data.data.imageUrl)
        })

    };
    fetchData();
  }, [id]);

//   console.log(serviceData)
const defaultValues = {
  
    title: serviceData?.title,
    categoryId: serviceData?.categoryId,
    subCategory: serviceData?.subCategory,
    price: serviceData?.price,
    organization: serviceData?.organization,
    serviceArea: serviceData?.serviceArea,
    description: serviceData?.description
};
  const categoryOptions = allCategories?.map((category) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });

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
                .patch(`${getBaseUrl()}/services/${id}`, data, {
                  headers: {
                    Authorization: `${getFromLocalStorage(authKey)}`,
                  },
                })
                .then((res) => {
                  res.data;
                  message.success("Service Updated Successfully");
                })
                .catch((err) => {
                  console.error(err.message);
                  message.error(err.message);
                });
            }
          })
          .catch((err) => message.error("Image Upload Failed"));
      }
      else{
            data["imageUrl"] = imageUrl;
              delete data["file"];
              data["price"] = parseInt(data.price);
              axios
                .patch(`${getBaseUrl()}/services/${id}`, data, {
                  headers: {
                    Authorization: `${getFromLocalStorage(authKey)}`,
                  },
                })
                .then((res) => {
                  res.data;
                  message.success("Service Updated Successfully");
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

//   const onSubmit = async (data: any) => {
//     message.loading("Updating.....");
//     // console.log(data);
//     try {
//       if(data.file){
//         let body = new FormData();
//         body.set("key", process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY as string);
//         body.append("image", data.file);

//         const imgBbUrl = "https://api.imgbb.com/1/upload";
//         axios
//           .post(imgBbUrl, body)
//           .then((res) => res.data)
//           .then((data) => setImageUrl(data.data.url))
//           .catch((err) => message.error("Image Upload Failed"));
//       }
//     } catch (error) {
//       message.error("Image Upload Failed");
//     }

//     try {
//       data["imageUrl"] = imageUrl;
//       delete data["file"];
//       data["price"] = parseInt(data.price);
//       axios
//         .patch(`${getBaseUrl()}/services/${id}`, data, {
//           headers: {
//             Authorization: `${getFromLocalStorage(authKey)}`,
//           },
//         })
//         .then((res) => res.data)
//         .then((data) => message.success("Service Updated Successfully"));
//     } catch (err: any) {
//       console.error(err.message);
//       message.error(err.message);
//     }
//   };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "service", link: `/${base}/service` },
        ]}
      />
      <h1>Update Service</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                size="large"
                name="categoryId"
                options={categoryOptions as SelectOptions[]}
                label="Category"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="subCategory" label="Sub Category" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="price" label="Price" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="organization" label="Organization" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="serviceArea" label="Service Area" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="description" label="Description" />
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

export default UpdateServicePage;
