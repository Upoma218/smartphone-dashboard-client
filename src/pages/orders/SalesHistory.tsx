import { DatePicker, DatePickerProps, Select} from "antd";
import { useState } from "react";
import { useSalesOrderQuery } from "../Products/productsApi";
import React from "react";
import {  Table } from "antd";
import { TPeriod, columns, periodOptions } from "./types";
import { TOrder } from "../../redux/types/productsTypes";
import dayjs from 'dayjs';



const formatDataForTable = (data : TOrder[]) => {
  if(!data){
    return [] 
  }
  return data?.map((item : TOrder) => {
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
  const { data: order } = useSalesOrderQuery({period, date});
  
 
  const onChange: DatePickerProps['onChange'] = (dateString) => {
    const formattedDate = dayjs(dateString).format('YYYY-MM-DD');
    setDate(formattedDate);
  };
 
  

  const handlePeriodChange = (value: {
    value: TPeriod;
    label: React.ReactNode;
  }) => {
    setPeriod(value.value);
  };

  return (
    <>
      <div className="flex justify-between p-6">
        <Select
          labelInValue
          defaultValue={{
            value: "yearly",
            label: "Yearly",
          }}
          style={{ width: 120 }}
          onChange={handlePeriodChange}
          options={periodOptions}
        />
      <DatePicker onChange={onChange} />
      </div>
      <Table columns={columns} dataSource={formatDataForTable(order?.data || [])} size="middle" />
    </>
  );
};

export default SalesHistory;
