import { SetStateAction } from "react";

interface Props {
  ingredientRecepie: string[];
  stepsRecepie: string[];
  titleRecepie: string;
  setShowSignUpModal?: React.Dispatch<SetStateAction<boolean>>;
  showSignUpModal?: boolean;
  isSignIn?: boolean;
}

export const RecepieCard = ({
  ingredientRecepie,
  titleRecepie,
  stepsRecepie,
  setShowSignUpModal,
  showSignUpModal,
  isSignIn = true,
}: Props) => {
  return (
    <div className="border p-4 rounded-xl min-h-[50%] relative flex flex-col gap-3 w-full">
      <h2 className="title text-4xl text-[#6D1600]">{titleRecepie}</h2>

      <h3 className="title text-2xl">Ingredients:</h3>
      <ul className="list-none">
        {ingredientRecepie && ingredientRecepie.length > 0 ? (
          ingredientRecepie.map((ingredient) => {
            if (typeof ingredient !== "string" || !ingredient.trim()) {
              return null;
            }
            return (
              <li className="text" key={ingredient}>
                {ingredient}
              </li>
            );
          })
        ) : (
          <li className="text">No ingredients provided</li>
        )}
      </ul>

      <h3 className="title text-2xl">Steps</h3>
      <ul className="">
        {stepsRecepie && stepsRecepie.length > 0 ? (
          stepsRecepie.map((step) => {
            if (typeof step !== "string" || !step.trim()) {
              return null;
            }
            return (
              <li className="text" key={step}>
                {step}
              </li>
            );
          })
        ) : (
          <li className="text">No steps provided</li>
        )}
      </ul>
      {isSignIn ? (
        setShowSignUpModal !== undefined && showSignUpModal !== undefined ? (
          <SignInButton
            setShowSignUpModal={setShowSignUpModal}
            showSignUpModal={showSignUpModal}
          />
        ) : null
      ) : (
        <button>Delete recepie</button>
      )}
    </div>
  );
};

interface SignInButtonProps {
  setShowSignUpModal: React.Dispatch<SetStateAction<boolean>>;
  showSignUpModal: boolean;
}

export const SignInButton = ({
  setShowSignUpModal,
  showSignUpModal,
}: SignInButtonProps) => {
  return (
    <button
      onClick={() => setShowSignUpModal(!showSignUpModal)}
      className="bg-[#6D1600] rounded-2xl w-fit text-white p-2 mt-3 cursor-pointer title"
    >
      Save recepie
    </button>
  );
};
