import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: 'experimental-edge',
};

const handler = (req: any) => {

    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') ?? 'Title'
    const coverImage = searchParams.get('coverImage') ?? 'coverImage'
    const authorName = searchParams.get('authorName') ?? 'authorName'
    const authorImage = searchParams.get('authorImage') ?? 'authorImage'

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
          }}
        >
          <img
            src={coverImage}
            alt="cv"
            tw="w-full rounded-md h-65"
          />
          <h1 tw="text-[#DC143C] font-extrabold text-4xl my-2">
            {title}
          </h1>
          <div tw="flex justify-center items-center mt-4">
            <img
              src={authorImage}
              alt="cv"
              tw="w-8 rounded-md h-8 mx-2 "
            />
            <p tw="text-gray-300 font-bold text-xl">{authorName}</p>
          </div>
        </div>
      ),

      {
        width: 800,
        height: 400,
      }
    );
}

export default handler;