import React from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlegoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      //   console.log(result);
      const res = await fetch("api/user/google", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handlegoogleAuth}
        className="p-3 bg-red-700 rounded-lg text-white w-123 uppercase hover:opacity-95"
      >
        Continue with google
      </button>
    </div>
  );
};

export default OAuth;
