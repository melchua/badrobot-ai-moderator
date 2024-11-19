import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const input = await req.json();

  const { error } = await supabase.from("artist").insert({
    name: input.name,
    email: input.email,
  });

  // Add artist to supabase database
  return new Promise(async (resolve) => {
    const input = await req.json();
    console.log("input", input);
    resolve(new Response(JSON.stringify({ input }), { status: 200 }));
  });
}
