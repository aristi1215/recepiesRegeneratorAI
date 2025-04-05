import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { RecepieCard } from "../shared/RecepieCard";
import { Close } from "../../../public/icons";
import { useNavigate } from "react-router";

export const Recepies = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string>("");

  const [userRecepies, setUserRecepies] = useState<
    { ingredients: string[]; title: string; steps: string[] }[]
  >([]);

  const [loadingRecepie, setLoadingRecepie] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
      return;
    }
    const fetchRecepies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/recepies?id=${userInfo.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserRecepies(data.data);
      } catch (error) {
        console.error("Error fetching recepies:", error);
      }
    };

    fetchRecepies();
  }, [userInfo]);

  const addIngredient = (e: FormEvent) => {
    e.preventDefault();
    if (ingredient.trim() !== "") {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const addRecepieDatabase = async (
    title: string,
    ingredients: string[],
    steps: string[]
  ) => {
    await fetch("http://localhost:3000/api/v1/recepies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recepie: { title, ingredients, steps, user_id: userInfo?.id },
      }),
    });
  };

  const handleCreateRecepie = async () => {
    if (ingredients.length < 1) {
      return;
    }

    setLoadingRecepie(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/gpt/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      const data = await response.json();
      const recipeObj = JSON.parse(data.output_text);
      setUserRecepies([
        ...userRecepies,
        {
          title: recipeObj.title,
          ingredients: recipeObj.Ingredients,
          steps: recipeObj.Steps,
        },
      ]);
      addRecepieDatabase(
        recipeObj.title,
        recipeObj.Ingredients,
        recipeObj.Steps
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecepie(false);
    }
  };


  const handleLogOut = () => {
    localStorage.removeItem('userInfo')
    setUserInfo(null)
  }

  return (
    <>
      <header className="p-4 bg-[#F2ECE9]">
        <div className="w-full flex justify-between">
          <h2 className="title text-[#6D1600] text-4xl">
            Welcome back! {userInfo?.email}
          </h2>
          <button onClick={handleLogOut} className="bg-[#6D1600] px-4 py-2 rounded-xl text-white cursor-pointer">Log out</button>
        </div>
        <h3 className="text text-xl">Explore all your recepies</h3>
      </header>

      <main className="bg-[#F2ECE9] px-10">
        <div>
          <form
            className="rounded-lg mb-6 min-w-[50rem] z-20"
            onSubmit={addIngredient}
          >
            <h2 className="title text-5xl mb-10 text-center">
              Create a new recepie
            </h2>
            <label
              htmlFor="ingredient"
              className="text-xl title cursor-pointer block"
            >
              Insert the ingredients you have
            </label>
            <div className="border rounded-lg flex items-center mt-3 p-2">
              <div className="flex flex-wrap gap-3 h-full items-center max-w-96">
                {ingredients.map((ing, index) => (
                  <div
                    key={`item-${index}`}
                    className="bg-gray-200 rounded-lg p-1 flex items-center"
                  >
                    <span className="truncate">{ing}</span>
                    <div
                      className="cursor-pointer ml-2"
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
            className={`cursor-pointer bg-[#6D1600] rounded-xl p-2 w-full h-[3rem] text-white z-20 mb-20 ${
              loadingRecepie ? "opacity-60" : ""
            }`}
            onClick={handleCreateRecepie}
            disabled={loadingRecepie}
          >
            Create new recepie
          </button>
        </div>

        <h3 className="title text-[#6D1600] text-4xl ">All my recepies</h3>
        {userRecepies.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-8">
            {userRecepies?.map((recepie, index) => (
              <div key={`recepie-${index}`} className="max-w-[28rem]">
                <RecepieCard
                  ingredientRecepie={recepie.ingredients}
                  stepsRecepie={recepie.steps}
                  titleRecepie={recepie.title}
                  isSignIn={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center h-full mt-8">
            <h2 className="title text-5xl">No recepies found</h2>
          </div>
        )}
      </main>
    </>
  );
};
