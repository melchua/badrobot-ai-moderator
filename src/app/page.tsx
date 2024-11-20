"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { moderatePostAn } from "./api/actions";
import Image from "next/image";
import { Disc3 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const CHAR_LIMIT = 280;

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

  const { mutate, isPending } = useMutation({
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  return (
    <div className="mt-12 sm:mt-20 flex flex-col h-screen relative">
      <div className="flex text-5xl mb-6 items-center justify-center font-extrabold">
        <div>
          <div className="flex flex-row items-center">
            <Image
              src="/badrobot.png"
              width={100}
              height={100}
              alt="badrobot.png"
            />
            <span>So... is this appropriate?</span>
          </div>
          <div className="w-full grid gap-2">
            <span className="flex flex-col w-full">
              <div className="text-xs font-light flex self-end">
                <span
                  className={`${
                    post.length > CHAR_LIMIT ? "text-red-600 font-semibold" : ""
                  } mr-2`}
                >
                  {post.length} of {CHAR_LIMIT}
                </span>
              </div>
              <Textarea
                placeholder="Enter potentially inappropriate post here..."
                value={post}
                onChange={handleChange}
                style={{ resize: "none" }}
                rows={4}
              />
            </span>

            <Button
              variant="default"
              className="text-white bg-black hover:bg-slate-600"
              onClick={onCheck}
              disabled={isPending || post.length > CHAR_LIMIT}
            >
              {isPending ? <Disc3 className="animate-spin" /> : null}
              Check
            </Button>
          </div>
        </div>
      </div>

      {!isPending && result ? (
        <div className="flex flex-col border-2 border-dashed p-4">
          <div>
            <div className="font-semibold text-2xl">
              {result?.isAppropriate ? "✅ Appropriate!" : "🙅🏻‍♀️ Inappropriate!"}
            </div>
            <div
              className={`italic ${
                !result?.isAppropriate ? "text-red-600 line-through" : ""
              }`}
            >
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
