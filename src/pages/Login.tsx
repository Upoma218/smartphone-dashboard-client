import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SPMForm from "../form/SPMForm";
import SPMInput from "../form/SPMInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { TUser } from "../redux/features/auth/authTypes";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();


  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        userId: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user: user, token: res.data.token }));

      toast.success("Successfully Logged in!!", { id: toastId, duration: 2000 });
      navigate(state?.from || "/");

    } catch (err) {
      toast.error("Enter correct information", { id: toastId, duration: 2000 });
    }
  };

  const loginValidationSchema = z.object({
    userId: z.string({ required_error: 'Enter correct User Id!' }),
    password: z.string({ required_error: 'Enter correct password' }),
  });

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-center text-sky-900">
        Login Here
      </h1>
      <Row
        justify="center"
        align="middle"
        className="bg-slate-200 p-6 rounded-lg mx-auto mt-6 w-72"
      >
        <SPMForm onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
          <SPMInput type="text" name="userId" label="User ID:"/>
          <SPMInput type="password" name="password" label="Password" />
          <Button
            htmlType="submit"
            className="bg-sky-900 text-white font-bold w-full"
          >
            Login
          </Button>
        </SPMForm>
        <h1 className="text-md text-center my-3">
          Don't have an account? Please, Register{" "}
          <span>
            <NavLink to="/register" className="text-sky-600">
              {" "}
              Register
            </NavLink>
          </span>
        </h1>
      </Row>
    </div>
  );
};

export default Login;
