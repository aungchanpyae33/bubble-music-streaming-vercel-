import { unstable_cache } from "next/cache";
import { turso } from "./turso";

export interface Movie {
  title: string;
}
export interface MovieRe {
  title: string;
}
export const getData = async (query: string) => {
  const { rows } = await turso.execute(
    `SELECT title FROM movieB WHERE title LIKE '${query}%'`
  );
  const data: Movie[] =
    rows.length > 0
      ? rows.map((row: any) => ({
          title: row.title,
        }))
      : [{ title: `we do not found the result` }];
  return data;
};

export async function getRecom(query: string) {
  console.log(query);

  if (query.length > 0) {
    console.time("Execution");

    const { rows } = await turso.execute(`
      WITH extracted_vector AS (
        SELECT vector_extract(embedding) AS embedding_vector 
        FROM movieB 
        WHERE title = '${query}'
      )
      SELECT title 
      FROM movieB, extracted_vector
      ORDER BY vector_distance_cos(embedding, extracted_vector.embedding_vector) 
      LIMIT 3
    `);

    console.timeEnd("Execution");

    const data: MovieRe[] = rows.map((row: any) => ({
      title: row.title,
    }));

    return data;
  }

  return [];
}
