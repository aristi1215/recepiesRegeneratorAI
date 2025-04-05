import { FormEvent, useEffect, useState } from "react";
import { Close } from "../../../public/icons";
import { RecepieCard } from "../shared/RecepieCard";

export const CreateRecepie = ({
  showSignUpModal,
  setShowSignUpModal,
}: {
  showSignUpModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState("");
  const [loadingRecepie, setLoadingRecepie] = useState(false);
  const [titleRecepie, setTitleRecepie] = useState("");
  const [ingredientRecepie, setIngredientsRecepie] = useState<string[]>([]);
  const [stepsRecepie, setStepsRecepie] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ingredient == "") {
      return;
    }
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  const removeIngredient = (ingredientIndex: number) => {
    setIngredients(ingredients.filter((_, index) => index !== ingredientIndex));
  };

  const handleCreateRecepie = async () => {
    if (ingredients.length < 1) {
      return;
    }

    setLoadingRecepie(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/gpt/create", {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const recipeObj = JSON.parse(data.output_text);

      setTitleRecepie(recipeObj.title);
      setIngredientsRecepie(recipeObj.Ingredients);
      setStepsRecepie(recipeObj.Steps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecepie(false);
    }
  };

  useEffect(() => {
    console.log(titleRecepie);
    console.log(ingredientRecepie);
    console.log(stepsRecepie);
  }, [titleRecepie, ingredientRecepie, stepsRecepie]);

  return (
    <section className="h-screen flex pt-10">
      <main className="flex flex-col items-center relative w-full">
        <form
          action=""
          className="rounded-lg min-h-[20rem] max-w-[50rem] z-20"
          onSubmit={handleSubmit}
        >
          <h3 className="title text-xl text-gray-700 text-center">Start Now</h3>
          <h2 className="title text-5xl mb-10 text-center">
            Create a new recepie
          </h2>
          <label htmlFor="ingredient" className="text-xl title cursor-pointer">
            Insert the ingredients you have
          </label>
          <br />
          <div className="border rounded-lg flex items-center mt-3 p-2">
            <div className="flex flex-wrap gap-3 h-full items-center max-w-96">
              {ingredients.map((ingredient, index) => (
                <div className="bg-gray-200 rounded-lg p-1 flex items-center">
                  <span key={`item-${index}`} className="truncate">
                    {ingredient}
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => removeIngredient(index)}
                  >
                    <Close size={30} />
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="w-full border-none focus:outline-none ml-1 h-full"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Insert your favourites..."
              id="ingredient"
            />
          </div>
        </form>
        <button
          className={`cursor-pointer bg-[#6D1600] rounded-xl max-w-96 p-2 text-white z-20 ${
            loadingRecepie ? "opacity-60" : ""
          }`}
          onClick={handleCreateRecepie}
          disabled={loadingRecepie}
        >
          Create recepie
        </button>
      </main>
      {titleRecepie && ingredientRecepie && stepsRecepie && (
        <aside className={`w-[50%] mr-10 items-center`}>
          {<RecepieCard ingredientRecepie={ingredients} titleRecepie={titleRecepie} setShowSignUpModal={setShowSignUpModal} showSignUpModal={showSignUpModal} stepsRecepie={stepsRecepie} />}
        </aside>
      )}
    </section>
  );
};
