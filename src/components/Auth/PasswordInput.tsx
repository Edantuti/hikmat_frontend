import { Dispatch, SetStateAction } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordInput = (props: {
  show: boolean;
  changeShow: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  formTag: string;
  register: any;
  requirement: any;
}) => {
  const Visible = props.show ? AiOutlineEyeInvisible : AiOutlineEye;
  return (
    <>
      <div className='relative m-0 flex w-full p-0'>
        <input
          className='mb-4 mt-1 w-full rounded border p-1 font-poppins shadow-inner'
          type={props.show ? 'text' : 'password'}
          placeholder={props.placeholder}
          {...props.register(props.formTag, props.requirement)}
        />
        <Visible
          className='absolute right-2 top-2 h-6 w-6'
          onClick={() => props.changeShow(!props.show)}
        />
      </div>
    </>
  );
};

export default PasswordInput;
