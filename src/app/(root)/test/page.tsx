import { getData, getRecom } from "@/database/data";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const data = await getRecom(query);
  return (
    <div>
      My Post: {query}
      {data?.map((item) => (
        <p key={item.title}>{item.title}</p>
      ))}
    </div>
  );
}
