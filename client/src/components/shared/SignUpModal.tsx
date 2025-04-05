import { FormEvent, useState } from "react";
import { Close } from "../../../public/icons";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router";

export const SignUpModal = ({
  showSignUpModal,
  setShowSignUpModal,
  setShowSignInModal,
}: {
  showSignUpModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const { signUp } = useAuthContext();

  const handleSingUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      signUp(email,password)
      navigate('/recepies')
      console.log("successfully created");
    } catch (err) {
      console.error("error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-xl h-[30rem] w-[25rem] bg-[#FFFFFF] transition-all duration-400 fixed  left-[40%] z-20 flex flex-col items-center text-center px-10 pb-10 pt-2 ${
        showSignUpModal ? "bottom-[20%]" : "-bottom-[200%]"
      } `}
    >
      <div className="flex w-full justify-end">
        <div
          onClick={() => setShowSignUpModal(false)}
          className="cursor-pointer"
        >
          <Close />
        </div>
      </div>
      <h2 className="text-[#6D1600] title text-3xl">Sign Up</h2>
      <p className="text">Sign up to see your recepies</p>
      <form className="mt-10 flex flex-col w-full px-5 items-center h-full justify-around">
        <div>
          <label htmlFor="emailSignUp" className="text w-full">
            Enter your email <br />
            <input
              type="email"
              placeholder="example@gmail.com"
              name="emailSignUp"
              id="emailSignUp"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2.5rem] my-2 p-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label htmlFor="passwordSignUp" className="text w-full">
            Enter your password <br />
            <input
              type="password"
              placeholder="********"
              name="passwordSignUp"
              id="passwordSignUp"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2.5rem] my-2 p-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <button
          className="bg-[#6D1600] rounded-2xl w-full text-white p-2 mt-3 cursor-pointer title"
          onClick={handleSingUp}
          disabled={loading}
        >
          Sign Up
        </button>
        <small className="text">
          Already haven an account,{" "}
          <strong
            className="cursor-pointer"
            onClick={() => {
              setShowSignInModal(true);
              setShowSignUpModal(false);
            }}
          >
            Sign Up
          </strong>
        </small>
      </form>
    </div>
  );
};
