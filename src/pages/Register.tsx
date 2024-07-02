import { Button, Row } from "antd";
import SPMForm from "../form/SPMForm";
import SPMInput from "../form/SPMInput";
import { FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import SPMSelect from "../form/SPMSelect";
import { useAppSelector } from "../redux/store";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { userSchema } from "./utils/constant";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering . . .");

    try {
      const userInfo = {
        userId: data.userId,
        email: data.email,
        role: data.role,
        password: data.password,
      };

      register(userInfo).unwrap();

      toast.success("Registration Successful!", {
        id: toastId,
        duration: 2000,
      });
      navigate(-1);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  

  const role = [];

  if (user?.role === "superAdmin") {
    role.push(
      {
        value: "manager",
        label: "Manager",
      },
      {
        value: "seller",
        label: "Seller",
      }
    );
  }

  if (user?.role === "manager") {
    role.push({
      value: "seller",
      label: "Seller",
    });
  }

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-sky-900 text-center mb-6">
        Registration Form
      </h1>
      <Row
        justify="center"
        align="middle"
        className="bg-slate-200 p-6 rounded-lg mx-auto mt-6 w-72"
      >
        <SPMForm onSubmit={onSubmit} resolver={zodResolver(userSchema)}>
          <SPMInput type="text" name="userId" label="User ID:" />
          <SPMInput type="email" name="email" label="Email:" />
          <SPMSelect label="Role" name="role" options={role} />
          <SPMInput type="password" name="password" label="Password" />
          <Button
            htmlType="submit"
            className="bg-sky-900 text-white font-bold w-full"
          >
            Register
          </Button>
        </SPMForm>
        <h1 className="text-md text-center my-3">
          Already Registered? Go to{" "}
          <span>
            <NavLink to="/login" className="text-sky-600">
              Login
            </NavLink>
          </span>
        </h1>
      </Row>
    </div>
  );
};

export default Register;
