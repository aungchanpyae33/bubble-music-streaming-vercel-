export default async function Page(props: {
  params: Promise<{ genre: string }>;
}) {
  const params = await props.params;
  return <div>My Post: {params.genre}</div>;
}
