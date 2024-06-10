import React, { useEffect } from "react";
import PreLoader from "../../components/ui/PreLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      const data = await dispatch(verifyEmail({ id, token }));
      if (data?.payload?.message && data?.payload?.token) {
        toast.info(data.payload.message);
        navigate("/");
      } else {
        toast.error("Что-то пошло не так, попробуйте снова");
        console.log(data, "error");
      }
    };
    verify();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <PreLoader verifyEmail={true} />
    </div>
  );
};

export default VerifyEmail;
