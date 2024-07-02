export type TPeriod = "daily" | "weekly" | "monthly" | "yearly";

export const columns = [
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Model",
    dataIndex: "model",
  },
  {
    title: "Buyer Name",
    dataIndex: "nameOfBuyer",
  },
  {
    title: "Date of Sale",
    dataIndex: "dateOfSale",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Operating System",
    dataIndex: "operatingSystem",
  },
  {
    title: "Total Sale",
    dataIndex: "productQuantity",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
];

export const periodOptions = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];

export type TOrderInvoice = {
  productName: string;
  nameOfBuyer: string;
  productQuantity: number;
  dateOfSale: string;
};
