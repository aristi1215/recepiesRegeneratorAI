export const SignInModal = ({
  showSignUpModal,
  setShowSignUpModal,
}: {
  showSignUpModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`rounded-xl h-[30rem] w-[25rem] bg-[#FFFFFF] transition-all duration-400 fixed  left-[40%] z-20 flex flex-col items-center text-center ${
        showSignUpModal ? "top-[20%]" : "-top-[200%]"
      } `}
      onClick={() => setShowSignUpModal(!showSignUpModal)}
    >
      <h2 className="text-[#6D1600] title text-3xl">Sign in</h2>
      <p>Sign in to save your recepies right now</p>
      <form className="mt-10 flex flex-col w-full px-5 items-center h-full justify-around">
        <div>
          <label htmlFor="email" className="text w-full">
            Enter your email <br />
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              id="email"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2rem] p-1"
            />
          </label>
          <label htmlFor="password" className="text w-full">
            Enter your email <br />
            <input
              type="password"
              placeholder="********"
              name="password"
              id="password"
              className="focus:outline-[#6D1600] text border border-[#6d1600] rounded-lg w-full h-[2rem] p-1"
            />
          </label>
        </div>
        <button className="bg-[#6D1600] rounded-2xl w-full text-white p-2 mt-3 cursor-pointer title">
          Sign In
        </button>
      </form>
    </div>
  );
};
