// Uses dynamic input to generate a contract
import { openai } from "./openai.js";

const history = [
  {
    role: "system",
    content:
      "You are a professional moderator that is an expert at finding inappropriate content specifically from people who comment on posts in social media.",
  },
];

export const moderatePost = async (input) => {
  if (!input) return;

  // Returns true if the post is appropriate, false if it is not
  const prompt = `Check the following post and determine if it contains any inappropriate content. 
  Return an object with the following format: { isAppropriate: true/false, reason: "reason for your decision" } but make sure it adheres to proper json. This is the post: ${input}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [...history, { role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};
