import { Layout, Menu, theme } from "antd";
import SearchBar from "../../pages/navBarItems/SearchBar";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/store";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    const toastId = toast.loading("Registering . . .");
    dispatch(logout());
    toast.success("Logged Out, Go to login", { id: toastId, duration: 2000 });
    console.error();
  };

  const items = [
    {
      key: "home",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "login",
      label: <NavLink to="/login">Login</NavLink>,
    },
    {
      key: "logout",
      label: (
        <button className="border-none " onClick={handleLogout}>
          Logout
        </button>
      ),
    },
    {
      key: "product",
      label: <NavLink className={!user ? "hidden" : ""} to="/product">Product</NavLink>,
    },

    {
      key: "salesHistory",
      label: (
        <NavLink className={!user ? "hidden" : ""} to="/order">
          Sales History
        </NavLink>
      ),
    },
    {
      key: "register",
      label: (
        <NavLink
          className={user?.role === "seller" ? "hidden" : !user ? "hidden" : ""}
          to="/register"
        >
          User Registration
        </NavLink>
      ),
    },
  ].map((item) => ({
    key: item.key,
    label: item.label,
  }));

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="flex justify-center items-center text-white mr-3 font-bold">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
              <path
                fillRule="evenodd"
                d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Management
        </div>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
        <SearchBar />
      </Header>
      <Layout>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ background: colorBgContainer }}
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="light" mode="inline" items={items} />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
