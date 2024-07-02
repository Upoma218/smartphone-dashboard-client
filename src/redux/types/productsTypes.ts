import dayjs from 'dayjs';

export type TProduct = {
    _id: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    releaseDate: string | dayjs.Dayjs;
    brand: string;
    model: string;
    operatingSystem: string;
    storageCapacity: string;
    screenSize: string;
    cameraQuality?: string;
    batteryLife?: string;
    color?: string;
    processor?: string;
    RAM?: string;
  };

  export type TInitialState = {
    todos: TProduct[];
  };

  export type TPhoneInfoCardProps = {
    product: TProduct;
    hasSelected: boolean;
    selectedRowKeys: React.Key[];
    rowSelection: {
      selectedRowKeys: React.Key[];
      onChange: (newSelectedRowKeys: React.Key[]) => void;
    };
  };
  export type TOrder = {
    _id: string;
    productId: TProduct;
    productQuantity: number;
    nameOfBuyer: string;
    dateOfSale: string| Date
}