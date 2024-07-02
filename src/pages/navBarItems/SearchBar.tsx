import { Input, Space } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { searchString } from "../Products/productsSlice";

const { Search } = Input;

const SearchBar = () => {
  const dispatch = useDispatch();
  const onSearch: SearchProps["onSearch"] = (value) => {
    dispatch(searchString(value));
    
  };
  return (
    <Space direction="vertical">
      <Search
        className="border border-1 rounded-lg align-middle"
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );
};

export default SearchBar;
