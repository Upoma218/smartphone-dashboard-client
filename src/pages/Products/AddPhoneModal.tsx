/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useAddProductMutation } from "./productsApi";
import { TProduct } from "../../redux/types/productsTypes";
import { message } from 'antd';

const AddPhoneModal = () => {
  const [open, setOpen] = useState(false);
  const [addProductMutation] = useAddProductMutation();

  const onFinish = async (values : TProduct) => {
    try {
      await addProductMutation(values);

      setOpen(false);

      message.success("Product added successfully!");
    } catch (error) {
      message.error("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  const onFinishFailed = (errorInfo : any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        className="bg-sky-900 text-white"
        type="primary"
        onClick={() => setOpen(true)}
      >
        Add Product
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
            Enter Your Product Information
          </h1>
        </>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="productPrice"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Please enter a valid product price!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="productQuantity"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Please enter a valid product quantity!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Release Date"
            name="releaseDate"
            rules={[
              {
                required: true,
                message: "Please select the release date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Brand" name="brand"rules={[
              {
                required: true,
                message: "Please enter brand name!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Model" name="model"rules={[
              {
                required: true,
                message: "Please enter model name!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="OS" name="operatingSystem"rules={[
              {
                required: true,
                message: "Please enter OS name!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Storage" name="storageCapacity"rules={[
              {
                required: true,
                message: "Please storageCapacity",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Screen" name="screenSize"rules={[
              {
                required: true,
                message: "Please enter screen size!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Camera" name="cameraQuality">
            <Input />
          </Form.Item>
          <Form.Item label="Battery" name="batteryLife">
            <Input />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>
          <Form.Item label="Processor" name="processor">
            <Input />
          </Form.Item>
          <Form.Item label="RAM" name="RAM">
            <Input />
          </Form.Item>
          <div className="text-center">
            <Button htmlType="submit" className="bg-sky-900 text-white">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};


export default AddPhoneModal;
