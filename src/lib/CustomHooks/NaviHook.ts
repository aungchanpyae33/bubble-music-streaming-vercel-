import { Movie } from "@/database/data";
import React, { RefObject, useEffect, useState } from "react";

interface NaviState {
  run: boolean;
  number: number; // Allow null for no selection
}
function useTest(
  initialState: NaviState,
  inputRef: RefObject<HTMLInputElement | null>,
  data: Movie[]
): [NaviState, React.Dispatch<React.SetStateAction<NaviState>>] {
  const [navi, setnavi] = useState(initialState);

  useEffect(() => {
    const copyRef = inputRef.current;

    function naviGateTB(e: string) {
      const searchData = data?.length;
      if (searchData && searchData > 0) {
        if (e === "ArrowUp") {
          setnavi((pre) => {
            const number = pre.number === -1 ? searchData - 1 : pre.number - 1;
            if (number >= 0) {
              copyRef!.value = data[number].title;
            }

            return {
              run: false,
              number: number,
            };
          });
        } else if (e === "ArrowDown") {
          setnavi((pre) => {
            const number = pre.number === searchData - 1 ? -1 : pre.number + 1;
            if (number >= 0) {
              copyRef!.value = data[number].title;
            }

            return {
              run: false,
              number: number,
            };
          });
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => naviGateTB(e.key);
    copyRef?.addEventListener("keydown", handleKeyDown);

    return () => {
      setnavi((pre) => {
        if (pre.number === -1 && pre.run === false) return pre;
        console.log("am i running");
        return {
          run: false,
          number: -1,
        };
      });
      copyRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef, data.length, data]);

  return [navi, setnavi];
}
export default useTest;
