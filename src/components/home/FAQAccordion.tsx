import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, ConfigProvider } from "antd";
import Heading from "../ui/Heading";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { FAQItem } from "@/types";

// Define an interface for the FAQ items


const FAQAccordion: React.FC = async () => {
  // Fetch FAQ data from your API
  const res = await fetch(getBaseUrl() + "/cms/faq/cms");
  const data = await res.json();

  // Map the fetched data to FAQ items
  const faqItems: FAQItem[] = data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.content,
  }));

  return (
    <div className="p-4">
      <Heading title="FAQ" />
      <p className="w-1/2 text-center mx-auto">
        We understand that you have questions, and we welcome them. Below is the
        collection of queries which comes frequently from our clients.
      </p>
      <div className="bg-white p-4 rounded-md w-3/4 mx-auto">
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "#fbe7f2",
              },
            },
          }}
        >
          <Collapse
            accordion
            defaultActiveKey={["1"]}
            items={faqItems.map((item) => ({
              key: item.id,
              label: item.title,
              children: <p>{item.content}</p>,
            }))}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FAQAccordion;
