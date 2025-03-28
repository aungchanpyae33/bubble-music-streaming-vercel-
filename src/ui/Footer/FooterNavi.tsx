import { contextProps } from "@/lib/DeviceContext/DeviceContextFooter";
import clsx from "clsx";
import Link from "next/link";

function FooterNavi({ device }: { device: contextProps["device"] }) {
  return (
    <div
      className={clsx(
        "w-full h-full flex overShort:hidden justify-around items-center",
        {
          hidden: device !== "mobile",
        }
      )}
    >
      <Link href={"/setting"} className="bg-red-950 p-2">
        Search
      </Link>
      <Link href={"/setting"} className="bg-red-950 p-2">
        Library
      </Link>
      <Link href={"/setting"} className="bg-red-950 p-2">
        Genre
      </Link>
      <Link href={"/setting"} className="bg-red-950 p-2">
        Live
      </Link>
    </div>
  );
}

export default FooterNavi;
