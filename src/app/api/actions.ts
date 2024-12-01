"use server"

import { moderatePost } from "../../services/ai/moderateAi"

export const moderatePostAn = async ({ post }: { post: string }) => {
  console.log("post", post)
  const result = await moderatePost(post)
  console.log("result on server", result)

  return result
}
