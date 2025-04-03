import { Navbar } from "./components/Navbar";
import { Hero } from "./components/sections/Hero";
import { CreateRecepie } from "./components/sections/CreateRecepie";
import { SignInModal } from "./components/shared/SignInModal";
import { useState } from "react";

function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  return (
    <>
      <header>
        <Navbar
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      </header>
      <main className="bg-[#F2ECE9]">
        <Hero />
        <CreateRecepie
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
        <SignInModal
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      </main>
    </>
  );
}

export default App;
