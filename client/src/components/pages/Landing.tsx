import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { CreateRecepie } from "../sections/CreateRecepie";
import { Hero } from "../sections/Hero";
import { SignInModal } from "../shared/SignInModal";
import { SignUpModal } from "../shared/SignUpModal";
import { useNavigate } from "react-router";

export const Landing = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/recepies");
    }
  }, [userInfo]);

  return (
    <>
      <header>
        <Navbar
          showSignInModal={showSignInModal}
          setShowSignInModal={setShowSignInModal}
        />
      </header>
      <main className="bg-[#F2ECE9]">
        <Hero />
        <CreateRecepie
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
        <SignInModal
          showSignInModal={showSignInModal}
          setShowSignUpModal={setShowSignUpModal}
          setShowSignInModal={setShowSignInModal}
        />
        <SignUpModal
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
          setShowSignInModal={setShowSignInModal}
        />
      </main>
    </>
  );
};
