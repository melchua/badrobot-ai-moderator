// app/api/runScript/route.js
import { moderatePost } from "../../ai/moderateAi";

export async function POST(req) {
  console.log("Moderating post...");

  const input = await req.json();

  return new Promise(async (resolve) => {
    const result = await moderatePost(input);
    resolve(new Response(JSON.stringify({ result }), { status: 200 }));
  });
}
