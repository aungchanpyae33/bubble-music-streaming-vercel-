function CheckTypeCreate() {
  return (
    <fieldset className=" my-2">
      <legend className="mb-2 font-medium">မြင်သာမှု</legend>
      <div className="flex flex-wrap gap-2">
        {["အများ", "သီးသန့်"].map((check, i) => (
          <label key={check} className="cursor-pointer">
            <input
              type="radio"
              name="typeCheck"
              value={check}
              defaultChecked={i === 0}
              className="sr-only peer"
            />
            <div
              className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-zinc-800 
               transition-colors duration-300
                         font-medium 
                        peer-checked:bg-[#3664ba] peer-checked:text-white 
                        hover:border-gray-400"
            >
              {check}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckTypeCreate;
