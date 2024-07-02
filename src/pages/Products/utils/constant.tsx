/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "../../../redux/types/productsTypes";

/* eslint-disable no-prototype-builtins */
export function objectToQueryParamString(obj: Record<string, number| string >) {
    const queryParams = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== '') {
            if(obj[key]){

                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
            }
        }
    }
    return queryParams.join('&');
}

interface Column {
    title: string;
    dataIndex: keyof TProduct | string;
    render?: (text: any, record: TProduct, index: number) => React.ReactNode;
  }
  
  export const columns: Column[] = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Price",
      dataIndex: "productPrice",
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "OS",
      dataIndex: "operatingSystem",
    },
    {
      title: "Storage",
      dataIndex: "storageCapacity",
    },
    {
      title: "Screen",
      dataIndex: "screenSize",
    },
    {
      title: "Camera",
      dataIndex: "cameraQuality",
    },
    {
      title: "Battery",
      dataIndex: "batteryLife",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "RAM",
      dataIndex: "RAM",
    },
    {
      title: "Processor",
      dataIndex: "processor",
    },
  ];
