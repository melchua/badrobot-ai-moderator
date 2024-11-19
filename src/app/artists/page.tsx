import { createClient } from "@supabase/supabase-js";

const Artists = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data: artists, error } = await supabase.from("artist").select("*");
  if (error) {
    console.error(error);
  }

  console.log("artists", artists);
  return (
    <div>
      <div>Artists</div>
      {artists?.map((artist) => {
        return <div key={artist.id}>{artist.name}</div>;
      })}
    </div>
  );
};

export default Artists;
