/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from "react";
import { useAddProductMutation, useUpdateProductMutation } from "./productsApi";
import { TProduct } from "../../redux/types/productsTypes";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";


interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  existingProduct?: TProduct;
  onUpdateSuccess: () => void;
  createVariant: boolean;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  open,
  onClose,
  existingProduct,
  createVariant,
  onUpdateSuccess,
}) => {
 
  const [updateProductMutation] = useUpdateProductMutation();
  const [addProductMutation] = useAddProductMutation();
  const [form] = Form.useForm();

  form.resetFields();

  const initialValue = { ...existingProduct };
  if (existingProduct?.releaseDate) {
    (initialValue.releaseDate = dayjs(existingProduct.releaseDate)),
      "YYYY-MM-DD";
  }

  const onFinish = async (values: TProduct) => {
    if (values?.releaseDate) {
      values.releaseDate = moment(
        new Date(values.releaseDate as string)
      ).format("YYYY-MM-DD");
    }
    try {
      if (createVariant) {
        await addProductMutation({ ...initialValue, ...values });
        message.success("Successfully created product variant!");
      } else {
        await updateProductMutation({ ...initialValue, ...values });

        message.success("Product updated successfully!");
      }

      
      onUpdateSuccess();
      form.resetFields();
    
      onClose();

    } catch (error) {
      message.error("Error updating product. Please try again.");
      console.error("Error updating product:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!open) {
      // Reset form when the modal is closed
      onClose();
    }
  }, [open, onClose]);

  return (
    <Modal centered open={open} onCancel={() => {
      onClose();
      form.resetFields();
    }} footer={null}>
      <>
        <h1 className="text-center font-bold text-2xl text-sky-900 my-6">
          Product Information
        </h1>
      </>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValue}
      >
        <Form.Item label="Name" name="productName">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="productPrice">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Quantity" name="productQuantity">
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
        <Form.Item label="OS" name="operatingSystem">
          <Input />
        </Form.Item>
        <Form.Item label="Storage" name="storageCapacity">
          <Input />
        </Form.Item>
        <Form.Item label="Screen" name="screenSize">
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
          <Button
            className="text-white bg-sky-900 font-semibold"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
