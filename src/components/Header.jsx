import { useEffect, useState } from "react";

function Header() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  function handleToggleMode() {
    setMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("mode", JSON.stringify(newMode));
      return newMode;
    });
  }

  useEffect(() => {
    if (mode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [mode]);

  return (
    <header className="text-lightGray h-[30vh]  dark:bg-[url('/bg-mobile-dark.jpg')] lg:dark:bg-[url('/bg-desktop-dark.jpg')] bg-[url('/bg-mobile-light.jpg')] lg:bg-[url('/bg-desktop-light.jpg')] bg-cover grid grid-rows-[1fr_1fr] items-end gap-14 lg:gap-20">
      <div className="flex justify-between items-center max-w-[40rem] mx-auto w-full px-6">
        <h1 className="tracking-[.5rem] uppercase text-2xl font-bold lg:text-3xl">
          todo
        </h1>
        {mode ? (
          <button onClick={handleToggleMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
        ) : (
          <button onClick={handleToggleMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
