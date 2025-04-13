import Image from "next/image";
import Link from "next/link";

function GenreContainer({ description }: { description: string }) {
  return (
    <Link
      href={`genre/${description}`}
      className="col-span-6 md:col-span-4 lg:col-span-3 bg-blue-600 shrink-0 relative flex"
    >
      <Image
        src="https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
        width={300}
        height={300}
        priority={false}
        // sizes="(min-width: 1040px) calc(25vw - 37px), (min-width: 780px) calc(33.33vw - 43px), calc(48.91vw - 47px)"
        alt="this is image element"
        className="object-cover w-[50%]"
      />

      <p>{description}</p>
    </Link>
  );
}

export default GenreContainer;
