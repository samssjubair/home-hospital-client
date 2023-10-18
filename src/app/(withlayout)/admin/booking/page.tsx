"use client";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";

import { Button, Input, Select, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { set } from "react-hook-form";

const { Option } = Select;

const OrderManagePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  //   const [deleteRoom] = useDeleteRoomMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  //   const { data, isLoading } = useRoomsQuery({ ...query });
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        `${getBaseUrl()}/bookings?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`,{
          headers:{
            Authorization: `${getFromLocalStorage(authKey)}`,
          }
        }
      )
      .then((res) => res.data)
      .then((data) => {
        setServices(data.data);
        setMeta(data.meta);
        setIsLoading(false);
      });
  }, [page, size, sortBy, sortOrder, searchTerm]);
  // console.log(services)

  //   const rooms = data?.rooms;
  //   const meta = data?.meta;
  // const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

// Define a function to handle the status update
const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
   message.loading("Updating Status...");
   try {
     const res = await axios.patch(
       `${getBaseUrl()}/bookings/${bookingId}`,
       { status: newStatus },
       {
         headers: {
           Authorization: `${getFromLocalStorage(authKey)}`,
         },
       }
     );
     if (res.status === 200) {
       message.success("Status Updated Successfully");
       setServices((prevServices) =>
         prevServices.map((service) =>
           service.id === bookingId
             ? { ...service, status: newStatus }
             : service
         )
       );
     }
   } catch (err: any) {
     message.error(err.message);
   }
};

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res = await axios.delete(`${getBaseUrl()}/bookings/${id}`, {
        headers: {
          Authorization: `${getFromLocalStorage(authKey)}`,
        },
      });
      if (res.status === 200) {
        message.success("Deleted Successfully");
        setServices(services.filter((service) => service.id !== id));
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Organization",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.organization}</>;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.name}</>;
      },
    },
    {
      title: "User",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.email}</>;
      },
    },
    {
      title: "Address",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.address}</>;
      },
    },
    {
      title: "Mobile",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.contactNo}</>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: any, record: any) {
        return (
          <Select
            defaultValue={data}
            style={{ width: 120 }}
            onChange={(value) => handleStatusUpdate(record.id, value)}
          >
            <Option value="booked">Booked</Option>
            <Option value="processing">Processing</Option>
            <Option value="completed">Completed</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        );
      },
    },

    {
      title: "Appointment Date",
      dataIndex: "appointment",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/booking/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              style={{
                margin: "0px 5px 0 0",
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
            {/* <Button type="primary" onClick={() => handleStatusUpdate(data?.id)}>
              Update Status
            </Button> */}
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />

      <ActionBar title="Booking List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          {/* <Link href="/admin/service/create">
            <Button type="primary">Create</Button>
          </Link> */}
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={services}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default OrderManagePage;
