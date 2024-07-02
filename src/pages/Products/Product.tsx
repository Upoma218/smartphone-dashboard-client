/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useDispatch } from "react-redux";
import { TOrder, TProduct } from "../../redux/types/productsTypes";
import {
  useGetAllProductsQuery,
  useDeleteProductsMutation,
  useCreateOrderMutation,
} from "./productsApi";
import { deleteProduct } from "./productsSlice";
import AddPhoneModal from "./AddPhoneModal";
import UpdateModal from "./UpdateModal";
import SalesModal from "../orders/SalesModal";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import {
  CopyOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import FilterComponent from "./FilterComponent";
import { TOrderInvoice } from "../orders/types";
import DownloadInvoice from "../orders/DownloadInvoice";
import { columns } from "./utils/constant";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import moment from "moment";

const Product = () => {
  const dispatch = useDispatch();


  const searchString = useAppSelector(
    (state: RootState) => state.product.searQuery
  );
  const user = useAppSelector(selectCurrentUser);

  // search query state
  const [query, setQuery] = useState("");

  // get all products
  const { data: product } = useGetAllProductsQuery(query);

  // loading state
  const [loading, setLoading] = useState(false);

  // select product for delete and bulk delete
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [deleteProductsMutation] = useDeleteProductsMutation();

  // create order
  const [createOrderMutation] = useCreateOrderMutation();

  // update product modal
  const [updateVisible, setUpdateVisible] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [updateProduct, setUpdateProduct] = useState<TProduct>({} as TProduct);
  

  // create variant
  const [createVariant, setCreateVariant] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([] as TProduct[]);

  // download order invoice
  const [orderInvoice, setOrderInvoice] = useState<TOrderInvoice>(
    {} as TOrderInvoice
  );
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // select rows
  const rowSelection: TableRowSelection<TProduct> = {
    type: "checkbox",
    onChange: (_selectedRowKeys: React.Key[], selectedRows: TProduct[]) => {
      setSelectedProductIds(selectedRows.map((row) => row._id));
    },
  };

  // handle sell and cancel cell
  const handleSell = (record: TProduct) => {
    setOpenModal(true);
    setProductId(record._id);
  };

  const handleCancelSell = () => {
    setOpenModal(false);
    setProductId(null);
  };

  // search product
  useEffect(() => {
    const getProducts: TProduct[] = product?.data || ([] as TProduct[]);
    const searchLower = searchString?.toLowerCase();
    const newProductsList = getProducts.filter((obj: any) => {
      for (const key in obj) {
        if (obj[key].toString().toLowerCase().includes(searchLower)) {
          return true;
        }
      }
      return false;
    });
    setProducts(newProductsList);
  }, [searchString, product]);

  // create order
  const createOrder = async (data: TOrder) => {
    try {
      const findProduct = product?.data?.find(
        (el: TProduct) => el._id === productId
      );

      if (data?.dateOfSale) {
        data.dateOfSale = moment(
          new Date(data.dateOfSale as string)
        ).format("YYYY-MM-DD");
      }
     

      if (findProduct.productQuantity < data.productQuantity) {
        message.error("Products are not sufficiant for order.");
      } else {
        
        const sellData = { ...data, productId };
        await createOrderMutation(sellData);

        setOrderInvoice({
          productName: findProduct.productName,
          nameOfBuyer: sellData.nameOfBuyer,
          productQuantity: sellData.productQuantity,
          dateOfSale: sellData.dateOfSale.toString(),
        });

        handleCancelSell();
        setIsInvoiceModalOpen(true);
        message.success("Oreder created successfully!");
      }
    } catch (error) {
      message.error("Error in creating order Please try again.");
      console.error("Error in creating order:", error);
    }
  };

  // create variant
  const handleCreateVariant = (record: TProduct) => {
    setUpdateProduct(record);
    setCreateVariant(true);
    setUpdateVisible(true);
  };

  // update product
  const handleUpdate = (record: TProduct) => {
    setUpdateProduct(record);
    setUpdateVisible(true);
  };

  const handleUpdateClose = () => {
    setCreateVariant(false);
    setUpdateVisible(false);
  };

  // delete products
  const start = async () => {
    setLoading(true);

    try {
      const result = await deleteProductsMutation(selectedProductIds);

      if ("data" in result) {
        dispatch(deleteProduct(result.data));
      }

      // Display success message
      message.success("Products deleted successfully!");
    } catch (error) {
      // Display error message
      message.error("Error deleting products. Please try again.");
      console.error("Error deleting products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-sky-900 mt-10 text-center">
        Product Information
      </h1>
      <div className="mx-auto flex flex-wrap justify-evenly items-center align-middle my-8 px-6">
        <div className="mb-4">
          <FilterComponent setQuery={setQuery} />
        </div>
        <div className={user?.role === "seller" ? "hidden": !user ? "hidden" : "mb-4"}>
          <AddPhoneModal />
        </div>
        <div
          className={user?.role === "superAdmin" ? "mb-4": !user ? "hidden" : "hidden"}
        >
          <Popconfirm
            title="Are you sure you want to delete the selected products?"
            onConfirm={start}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { background: "green", color: "white" } }}
            cancelButtonProps={{ style: { background: "red", color: "white" } }}
          >
            <Button
              className="ml-2 md:ml-0"
              type="primary"
              danger
              disabled={selectedProductIds.length === 0}
              loading={loading}
            >
              Delete Product
            </Button>
          </Popconfirm>
        </div>
      </div>

      <UpdateModal
        open={updateVisible}
        onClose={handleUpdateClose}
        existingProduct={updateProduct}
        onUpdateSuccess={() => {}}
        createVariant={createVariant}
      />
      <SalesModal
        isOpen={openModal}
        handleCancelSell={handleCancelSell}
        createOrder={createOrder}
      />
      <DownloadInvoice
        isInvoiceModalOpen={isInvoiceModalOpen}
        orderInvoice={orderInvoice}
        setIsInvoiceModalOpen={setIsInvoiceModalOpen}
      />
      <Table
        className="px-8"
        columns={[
          
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_text: any, record: TProduct) => (
              <div className="flex gap-2">
                <EditOutlined
                  className={user?.role === "seller" ? "hidden": !user ? "hidden" : ""}
                  onClick={() => handleUpdate(record)}
                />
                <ShoppingCartOutlined
                  className={user?.role === "manager" ? "hidden": !user ? "hidden" : ""}
                  onClick={() => handleSell(record)}
                />
                <CopyOutlined
                  className={user?.role === "seller" ? "hidden": !user ? "hidden" : ""}
                  onClick={() => handleCreateVariant(record)}
                />
              </div>
            ),
          },
          ...columns,
        ]}
        dataSource={products.map((product) => ({
          ...product,
          key: product._id,
        }))}
        rowSelection={user?.role === "superAdmin" ? rowSelection: !user ? undefined : undefined}
        pagination={{ position: ["bottomLeft"] }}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default Product;
