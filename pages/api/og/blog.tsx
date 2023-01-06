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

    console.log('api', title)

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
        </div>
      ),

      {
        width: 1200,
        height: 630,
      }
    );
}

export default handler;