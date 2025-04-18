import { FormEvent, useState } from "react";
import { Close } from "../../../public/icons";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export const SignInModal = ({
  showSignInModal,
  setShowSignUpModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn} = useAuthContext();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      console.log("Successfully signed in");
      toast.success('Successfully logged in!')
      navigate("/recepies");
    } catch (err) {
      console.error("Error signing in:", err);
      toast.error('Incorrect credentials!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-xl h-[30rem] w-[25rem] bg-[#FFFFFF] transition-all duration-400 fixed left-[40%] z-20 flex flex-col items-center text-center px-10 pb-10 pt-2 ${
        showSignInModal ? "top-[20%]" : "-top-[200%]"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex w-full justify-end">
        <div
          onClick={() => setShowSignInModal(false)}
          className="cursor-pointer"
        >
          <Close />
        </div>
      </div>
      <h2 className="text-[#6D1600] title text-3xl">Sign in</h2>
      <p className="text">Sign in to save your recepies right now</p>
      <form
        className="mt-10 flex flex-col w-full px-5 items-center h-full justify-around"
        onSubmit={handleSignIn}
      >
        <div>
          <label htmlFor="email" className="text w-full">
            Enter your email <br />
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              id="email"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2.5rem] my-2 p-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label htmlFor="password" className="text w-full">
            Enter your password <br />
            <input
              type="password"
              placeholder="********"
              name="password"
              id="password"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2.5rem] my-2 p-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#6D1600] rounded-2xl w-full text-white p-2 mt-3 cursor-pointer title"
        >
          Sign In
        </button>
        <small className="text">
          Don't have an account,{" "}
          <strong
            className="cursor-pointer"
            onClick={() => {
              setShowSignInModal(false);
              setShowSignUpModal(true);
            }}
          >
            Sign Up
          </strong>
        </small>
      </form>
    </div>
  );
};
