import React, { RefObject } from "react";
export const fetchSegement = (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  segNum: number | undefined = undefined,
  abortController: AbortController | null //need to get the data from other side ,so not use current
) => {
  const fetchOptions: RequestInit = {
    signal: abortController?.signal,
  };
  // https://bubbleapideno.netlify.app
  // fetch(`https://bubblemusicapi.vercel.app/api?with=${outputUrl}`, fetchOptions)

  // `https://jolly-sun-bbad.bubblemusic990.workers.dev/api?with=${outputUrl}`,
  const videoSegments = [
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/init-0TAfqEjXFIa0bgWNXcKCTOyzcHrBjT.mp4",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-1-lCFP33NSRj0eZ0j3YSmE6kis23JtzR.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-2-Z5aIE3Wu8hngaXF1GqQ56k37TDmvBQ.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-3-wXeG2m787VibDnbgJw2zcJtJKGa6Ja.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-4-a72xmuMaMUP3mpbJfoa6dYaNVvKpW0.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-5-T87QbWyzvYVYEhOJLOwu9QBLVYUaxB.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-6-Yo6P4NirQUq769mStKWHUKE9t7ObjS.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-7-vaJ2aDpExEFeYTUo9malwGLoDxN3uu.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-8-Mazeu0AkmDdnxMWfHuaDm0Roi0QWSc.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-9-TsWubg5F8KUeb6KInzBmim7JOJOb0X.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-10-4Pz6MWdiCYGvIxUBEQbhQUDTpcqtn4.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-11-T4hPEMDpdEUkFEPwmxSMX6iweVa7Ji.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-12-XGJvIOoo4Dsd2GLJEnHXO8lrjTlnBa.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-13-qWNmkPgpjSa21daRqnQoOnEZLKGXxO.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-14-VWdnk8hiRRIAtyN1wmfVavUtj2tbf6.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-15-bJc7DFYubR6Nmk7KW8DBZspLP4iabR.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-16-Od9bgUULoyXwbfhJuKN0H6aB8KsbPf.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-17-ihcm321MJBv4PNKzuOE2mcJMKvpzeG.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-18-cWVC2QsAP3gcffm0NCwc2TsMJnPSYO.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-19-LqNqpnlmwJolHwK39mMP6N80lvg0S0.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-20-T0KYYkcPaYk0MEZ9ZmYyWv5QnN0FsQ.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-21-O8qDAUNqb4kSys0yO7VC49oZ5zJauG.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-22-uzMLWW8bVg5pJamFmrTWIjQC08wmOo.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-23-KFXVk0LjADnUZzqrcnD25OC85famts.m4s",
    "https://yjmy4vqx1hgnqkoq.public.blob.vercel-storage.com/boll/seg-24-Hp2AwxkuKdCOk6FDCgJRzHKd3Q5fKX.m4s",
  ];

  const outputUrl = segNum ? url.replace("init.mp4", `seg-${segNum}.m4s`) : url;

  fetch(`${outputUrl}`, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`failed to fetch the song segements sege-${segNum}`);
      }
      return response.arrayBuffer();
    })
    .then((buf) => {
      if (
        sourceBuffer.current?.buffered &&
        !sourceBuffer.current.updating &&
        mediaSource.current?.readyState
      ) {
        console.log(segNum, "i got buffend");

        sourceBuffer.current!.appendBuffer(buf);
      }
    })

    .catch((err) => {
      if (err.name === "AbortError") {
        console.log(`the song segements sege-${segNum} fetching is aborted`);
      } else {
        console.error(`Error fetching segements sege-${segNum}`, err);
      }
    });
};
