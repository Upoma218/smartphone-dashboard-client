/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
} from "antd";
import { useState } from "react";
import { objectToQueryParamString } from "./utils/constant";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type TProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FilterComponent = ({ setQuery }: TProps) => {
  const [open, setOpen] = useState(false);


  const onFinish = async (data: Record<string, string>) => {
    try {
      setOpen(false);

      if (data.releaseDate && dayjs(data.releaseDate).isValid()) {
        const formattedDate = dayjs(data.releaseDate).format('YYYY-MM-DD');
        data.releaseDate = formattedDate;
      }
      
      setQuery(objectToQueryParamString(data));
      message.success("Product retrived successfully!");
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        className="bg-sky-900 text-white mr-2"
        type="primary"
        onClick={() => setOpen(true)}
      >
        Filter Product
      </Button>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <>
          <h1 className="text-center font-bold text-2xl text-sky-900 my-6">
            What do you want to search? Write here 🌝
          </h1>
        </>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-3/4">
            <Form.Item label="Minimum Price" name="minPrice">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Maximum Price" name="maxPrice">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Release Date" name="releaseDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Brand" name="brand">
              <Input />
            </Form.Item>
            <Form.Item label="Model" name="model">
              <Input />
            </Form.Item>
            <Form.Item label="Operating System" name="operatingSystem">
              <Input />
            </Form.Item>
            <Form.Item label="Storage Capacity" name="storageCapacity">
              <Input />
            </Form.Item>
            <Form.Item label="Screen Size" name="screenSize">
              <Input />
            </Form.Item>
            <Form.Item label="Camera Quality" name="cameraQuality">
              <Input />
            </Form.Item>
            <Form.Item label="Battery Life" name="batteryLife">
              <Input />
            </Form.Item>
          </div>

          <div className="text-center">
            <Button htmlType="submit" className="bg-sky-900 text-white">
              Search Product
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default FilterComponent;
