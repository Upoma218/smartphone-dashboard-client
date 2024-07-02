/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";


type TProps = {
  isOpen: boolean;
  handleCancelSell: () => void;
  createOrder: (values: any) => void;
};

const SalesModal = ({ isOpen, handleCancelSell, createOrder}: TProps) => {


  return (
    <>
      <Modal
        title="Enter the required information"
        style={{ textAlign: "center" }}
        centered
        open={isOpen}
        onOk={() => false}
        onCancel={handleCancelSell}
      >
        <Form
          layout="horizontal"
          onFinish={createOrder}
          style={{ width: "100%", padding: "40px" }}
        >
          <Form.Item
            label="Name of the buyer"
            name="nameOfBuyer"
            rules={[
              {
                required: true,
                message: "Please enter the buyer name!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Product Quantity"
            name="productQuantity"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "Please enter the product quntity!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Date of sale"
            name="dateOfSale"
            rules={[
              {
                required: true,
                message: "Please enter the date os sale!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
    </>
  );
};

export default SalesModal;
