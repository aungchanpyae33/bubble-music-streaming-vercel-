import { supabase } from "./supabase";
export interface Movie {
  title: string;
}
export interface MovieRe {
  title: string;
}

export const get = async () => {
  const { data: songs, error } = await supabase.from("song").select("title");
  return { data: songs, error };
};
export const getData = async (query: string) => {
  const { data: song, error } = await supabase
    .from("song")
    .select("title")
    .ilike("title", `${query}%`);
  console.log(song);
  return song;
};

export const insertData = async (formData: FormDataEntryValue) => {
  const { data: song, error } = await supabase
    .from("song")
    .insert([{ title: formData }])
    .select("title");
  return { data: song, error };
};

// export async function getRecom(query: string) {
//   console.log(query);

//   if (query.length > 0) {
//     // console.time("Execution");

//     const { rows } = await turso.execute(`
//       WITH extracted_vector AS (
//         SELECT vector_extract(embedding) AS embedding_vector
//         FROM movieB
//         WHERE title = '${query}'
//       )
//       SELECT title
//       FROM movieB, extracted_vector
//       ORDER BY vector_distance_cos(embedding, extracted_vector.embedding_vector)
//       LIMIT 3
//     `);

//     // console.timeEnd("Execution");

//     const data: MovieRe[] = rows.map((row: any) => ({
//       title: row.title,
//     }));

//     return data;
//   }

//   return [];
// }
