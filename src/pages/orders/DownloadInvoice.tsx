import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { TOrderInvoice } from "./types";
import { Modal } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type TProps = {
  orderInvoice: TOrderInvoice;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DownloadInvoice = ({
  orderInvoice,
  setIsInvoiceModalOpen,
  isInvoiceModalOpen,
}: TProps) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Product Name",
      children: orderInvoice.productName,
    },
    {
      key: "2",
      label: "Product Quantity",
      children: orderInvoice.productQuantity,
    },
    {
      key: "3",
      label: "Name of Buyer",
      children: orderInvoice.nameOfBuyer,
    },
    {
      key: "4",
      label: "Date of Sale",
      children: orderInvoice.dateOfSale,
    },
  ];

  const handleModalOk = () => {
    handlePrint(null, () => contentToPrint.current);

    setIsInvoiceModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsInvoiceModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isInvoiceModalOpen}
        centered
        okText={"Download PDF"}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        style={{ textAlign: "center", fontSize: "1.5rem"  }}
        okButtonProps={{ style: { background: "green", color: "white" } }}
        cancelButtonProps={{ style: { background: "red", color: "white" } }}
      >
        <div ref={contentToPrint} className="p-6">
          <Descriptions
            title="Order Invoice"
            layout="horizontal"
            items={items}
            className="border-8 p-8"
            column={1}
            labelStyle={{ fontWeight: "bold" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default DownloadInvoice;
