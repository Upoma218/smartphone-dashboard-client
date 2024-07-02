import { Input } from 'antd';
import { Controller } from 'react-hook-form';


type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
};




const SPMInput = ({ type, name, label, defaultValue }: TInputProps) => {
  return (
    <div className='my-4'>
    {label ? label : null}
    <Controller
      name={name}
      defaultValue={defaultValue} 
      render={({ field , fieldState : {error}}) =>
      <div>
        <Input {...field} type={type} id={name}/>
        {error && <small className='text-red-500'>{error.message}</small>}
      </div>
      
    }
    />
  </div>
  );
};

export default SPMInput;