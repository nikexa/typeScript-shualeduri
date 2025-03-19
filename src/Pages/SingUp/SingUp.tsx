import { useForm } from "react-hook-form";
import rame from "/rame.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Link, useNavigate } from "react-router";


const schema = yup.object().shape({
  email: yup.string().required("cant be empty").email("cant be empty"),
  password: yup.string().required("cant be empty").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "cant be empty"),
  RepPassword: yup.string().required("cant be empty").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "cant be empty")
})

interface data {
  email: string;
  password: string;
  RepPassword: string;
}

const SingUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)});


  const navigate = useNavigate();



  const onSubmit = (data: data) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/login");
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="w-full h-screen bg-[#10141E] flex items-center justify-center flex-col gap-30">
      <img src={rame} alt="" />

      <div className="w-[400px] h-[418px] rounded-2xl bg-[#161D2F] flex flex-col items-center mb-40">
        <p className="font-normal text-[32px] text-white w-full pt-7 pl-9 ">
          Sign Up
        </p>
        <form
          onClick={handleSubmit(onSubmit)}
          className="w-[336px] flex flex-col gap-4 mt-7"
        >
          <div className="border-b-1 border-b-[#5A698F] w-full h-[37px] pl-5 pb-[15px] flex justify-between">
          <input
            {...register("email" , {
              required: {message: "cant be empty" , value: true},
            })}
            className="font-normal text-[15px] text-white opacity-50 outline-0 w-full"
            type="text"
            placeholder="Email address"
          />
          {errors.email && <p className="font-normal text-[13px] text-[#FC4747] w-[115px]">{errors.email.message}</p>}
          </div>
          <div className="border-b-1 border-b-[#5A698F] w-full h-[37px] pl-5 pb-[15px] flex justify-between">
          <input
            {...register("password")}
            className="font-normal text-[15px] text-white opacity-50 outline-0 w-full"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="font-normal text-[13px] text-[#FC4747] w-[115px]">{errors.password.message}</p>}
          </div>
          <div className="border-b-1 border-b-[#5A698F] w-full h-[37px] pl-5 mb-2 pb-[15px] flex justify-between">
          <input
            {...register("RepPassword")}
            className="font-normal text-[15px] text-white opacity-50 outline-0 w-full"
            type="password"
            placeholder="Repeat password"
          />
          {errors.RepPassword && <p className="font-normal text-[13px] text-[#FC4747] w-[115px]">{errors.RepPassword.message}</p>}
          </div>
          <button className="w-full h-[48px] rounded-lg bg-[#FC4747] font-normal text-[15px] text-white">
            Create an account
          </button>
        </form>
        <div className="flex gap-2 mt-8">
          <p className="font-normal text-[15px] text-white">
            Already have an account?
          </p>
          <p className="font-normal text-[15px] text-[#FC4747]"><Link to={"/login"}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
