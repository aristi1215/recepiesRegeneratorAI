import { UserIcon } from "../../public/icons/index";
export const Navbar = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="w-full flex justify-between px-6 items-center h-[4rem] bg-[#6D1600] ">
      <img src="images/logo.webp" alt="" className="w-10 h-10 rounded-full" />
      <div onClick={() => {
        setShowSignInModal(!showSignInModal)
        }} className="cursor-pointer">
        <UserIcon color="white" />
      </div>
    </nav>
  );
};
