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
): [NaviState] {
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
      if (navi.run && navi.number !== -1) {
        setnavi({ run: false, number: -1 });
      }
      // just use navi check and call setnavi only for clear console , both same behavior altho setnavi(pre) has additional re-render that does not effect to its render tree (see comment in audioInfoOverFlow.tsx
      // setnavi((pre) => {
      //   if (pre.number === -1 && pre.run === false) {
      //     console.warn("am i crazy");
      //     return pre;
      //   }
      //   console.warn("am i running");
      //   return {
      //     run: false,
      //     number: -1,
      //   };
      // });
      copyRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef, data.length, data, navi]);

  return [navi];
}
export default useTest;
