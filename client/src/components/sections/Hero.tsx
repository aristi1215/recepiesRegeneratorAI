import { GoArrowDown } from "../../../public/icons";
import { Slider } from "../Slider";

export const Hero = () => {
  return (
    <section className="flex  items-center justify-around pb-10">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-center title text-5xl ">
          Create Easy Recepies <br /> With AI In Minutes
        </h1>
        <p className="text-center text mt-6">
          Enter ingredients that you have on your freezer and get easy recepies in
          minutes
        </p>
        <div className="relative">
          <button className="rounded-tr-2xl rounded-bl-2xl p-5 mt-10 text-white title text-2xl bg-[#6D1600] w-[20rem] cursor-pointer">
            Get Started Now
          </button>
          <GoArrowDown
            color="white"
            className="absolute right-4 top-[50%] cursor-pointer"
          />
        </div>
      </div>
      <Slider />
    </section>
  );
};
