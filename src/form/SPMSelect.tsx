import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};


const SPMSelect = ({ label, name, options }: TPHSelectProps) => {
  return (
    <div className="my-4">
        {label ? label : null}
    <Controller
    name={name}
    render={({ field, fieldState: {error} }) => (
      <Form>
        <Select
          style={{ width: "100%" }}
          {...field}
          options={options} size="large"
        />
      {error && <small style={{color: "red"}}>{error.message}</small>}
      </Form>
    )}
  />
    </div>
  );
};

export default SPMSelect;