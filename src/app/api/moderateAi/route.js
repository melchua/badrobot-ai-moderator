// app/api/runScript/route.js
import { moderatePost } from '../../../services/ai/moderateAi'

export async function POST(req) {
  const input = await req.json()

  return new Promise(async (resolve) => {
    const result = await moderatePost(input)
    resolve(new Response(JSON.stringify({ result }), { status: 200 }))
  })
}
