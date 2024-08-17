/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps, Select, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TOrder } from "../../redux/types/productsTypes";
import { useSalesOrderQuery } from "../Products/productsApi";
import { TPeriod, columns, periodOptions } from "./types";

const formatDataForCharts = (data: TOrder[]) => {
  if (!data) return { lineData: [], barData: [], pieData: [] };

  const lineData = data.map((item: TOrder) => ({
    dateOfSale: dayjs(item.dateOfSale).format("YYYY-MM-DD"),
    productName: item?.productId?.productName,
    productQuantity: item?.productQuantity,
    productPrice: item?.productId?.productPrice,
  }));

  const barData = data.reduce((acc: any[], item: TOrder) => {
    const existing = acc.find(
      (i) => i.productName === item?.productId?.productName
    );
    if (existing) {
      existing.productQuantity += item.productQuantity;
    } else {
      acc.push({
        productName: item?.productId?.productName,
        productQuantity: item?.productQuantity,
      });
    }
    return acc;
  }, []);

  const totalQuantity = data.reduce(
    (total, item) => total + item.productQuantity,
    0
  );

  const pieData = data.reduce((acc: any[], item: TOrder) => {
    const existing = acc.find(
      (i) => i.productName === item?.productId?.productName
    );
    if (existing) {
      existing.value += item.productQuantity;
    } else {
      acc.push({
        name: item?.productId?.productName,
        value: item.productQuantity,
      });
    }
    return acc;
  }, []);

  return { lineData, barData, pieData, totalQuantity };
};

const formatDataForTable = (data: TOrder[]) => {
  if (!data) {
    return [];
  }
  return data.map((item: TOrder) => {
    return {
      key: item._id,
      productName: item?.productId?.productName,
      model: item?.productId?.model,
      brand: item?.productId?.brand,
      operatingSystem: item?.productId?.operatingSystem,
      productQuantity: item?.productQuantity,
      price: item?.productId?.productPrice * item?.productQuantity,
      nameOfBuyer: item?.nameOfBuyer,
      dateOfSale: item?.dateOfSale,
    };
  });
};

const SalesHistory = () => {
  const [period, setPeriod] = useState("yearly");
  const [date, setDate] = useState("");
  const { data: order } = useSalesOrderQuery({ period, date });
  const productData = order?.data?.salesHistory;
  console.log(order?.data?.salesHistory);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    const formattedDate = dayjs(dateString).format("YYYY-MM-DD");
    setDate(formattedDate);
  };

  const handlePeriodChange = (value: {
    value: TPeriod;
    label: React.ReactNode;
  }) => {
    setPeriod(value.value);
  };

  const { lineData, barData } = formatDataForCharts(productData || []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between p-4 md:p-6">
        <Select
          labelInValue
          defaultValue={{ value: "yearly", label: "Yearly" }}
          style={{ width: 120 }}
          onChange={handlePeriodChange}
          options={periodOptions}
          className="mb-4 md:mb-0"
        />
        <DatePicker onChange={onChange} className="w-full md:w-auto" />
      </div>

      {(!lineData || lineData.length === 0) &&
      (!barData || barData.length === 0) &&
      (!productData || productData.length === 0) ? (
        <div className="text-center text-xl font-bold text-red-600 mt-10">
          No Product Sold In this Time Period
        </div>
      ) : (
        <>
          {/* Line Chart */}
          <div className="mb-8 p-4 md:p-6">
            <h1 className="text-sky-900 text-xl font-bold my-6 text-center">
              Sales History
            </h1>
            <div className="w-full h-64 sm:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateOfSale" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="productQuantity"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="productPrice"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-8 p-4 md:p-6">
            <h1 className="text-sky-900 text-xl font-bold my-6 text-center">
              Product Sales Information
            </h1>
            <div className="w-full h-64 sm:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="productQuantity" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <h1 className="text-sky-900 text-xl font-bold my-6 text-center">
            Product Details Information
          </h1>
          <div className="p-4 md:p-6 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={formatDataForTable(productData || [])}
              size="middle"
              scroll={{ x: 800 }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SalesHistory;
