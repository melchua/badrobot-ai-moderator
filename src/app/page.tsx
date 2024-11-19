"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { moderatePostAn } from "./api/actions";
import Image from "next/image";
import { Disc3 } from "lucide-react";

interface Result {
  isAppropriate: boolean;
  reason: string;
}

export default function Home() {
  const [post, setPost] = useState("");
  const [prevPost, setPrevPost] = useState("");
  const [result, setResult] = useState<
    Result | { isAppropriate: boolean; reason: string } | null
  >(null);

  const { mutate, isError, isPending } = useMutation({
    mutationFn: moderatePostAn,
    onSuccess: (data) => {
      // Handle the data returned here
      if (data) {
        const parsedData = JSON.parse(data);
        setResult(parsedData);
        setPrevPost(post);
        setPost("");
      }
    },
  });

  const onCheck = () => {
    setResult(null);
    mutate({ post: post });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  return (
    <div className="mt-12 flex flex-col h-screen relative">
      <div className="text-5xl items-center justify-center font-extrabold p-10">
        <div>
          <Image
            src="/badrobot.png"
            width={100}
            height={100}
            alt="badrobot.png"
            className="absolute top-1 -left-7"
          />
        </div>

        <div>
          <div className="mb-5">Tell me if this is appropriate...</div>

          <div className="flex items-center flex-row gap-2">
            <Input
              placeholder="Enter potentially inappropriate post here..."
              value={post}
              onChange={handleChange}
            />

            <Button
              variant="default"
              className="text-white bg-black hover:bg-slate-600"
              onClick={onCheck}
              disabled={isPending}
            >
              {isPending ? <Disc3 className="animate-spin" /> : null}
              Check
            </Button>
          </div>
        </div>
      </div>

      {!isPending && result ? (
        <div className="flex flex-col mx-12">
          <div>
            <div className="uppercase font-semibold text-2xl">
              {result?.isAppropriate ? "✅ Appropriate!" : "🙅🏻‍♀️ Inappropriate!"}
            </div>
            <div className="italic text-red-600 line-through">
              &quot;{prevPost}&quot;
            </div>
          </div>
          <div className="text-xs text-slate-700">
            Reasoning: {result?.reason}{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
}
