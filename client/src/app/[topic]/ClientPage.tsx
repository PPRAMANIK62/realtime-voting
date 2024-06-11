"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { Wordcloud } from "@visx/wordcloud";
import { useState } from "react";
import { submitComment } from "../actions";

interface ClientPageProps {
  topicName: string;
  initialData: { text: string; value: number }[];
}

const COLORS = ["#143059", "#2F6B9A", "#82A6C2"];

const ClientPage = ({ topicName, initialData }: ClientPageProps) => {
  const [words, setWords] = useState(initialData);
  const [input, setInput] = useState<string>("");

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((word) => word.value)),
      Math.max(...words.map((word) => word.value)),
    ],
    range: [10, 100],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitComment,
  });

  return (
    <div className=" w-full flex flex-col items-center justify-center min-h-screen bg-grid-zinc-50 dark:bg-grid-gray-900">
      <MaxWidthWrapper className=" flex flex-col items-center gap-6 pt-20">
        <h1 className=" text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
          What people think about{" "}
          <span className=" text-blue-600">{topicName}</span> :
        </h1>

        <p className=" text-sm">(updated in real-time)</p>

        <div className=" aspect-square max-w-xl flex items-center justify-center">
          <Wordcloud
            words={words}
            width={500}
            height={500}
            fontSize={(data) => fontScale(data.value)}
            font={"Impact"}
            padding={2}
            spiral={"archimedean"}
            rotate={0}
            random={() => 0.5}
          >
            {(cloudWords) =>
              cloudWords.map((word, i) => (
                <Text
                  key={word.text}
                  fill={COLORS[i % COLORS.length]}
                  textAnchor="middle"
                  transform={`translate(${word.x}, ${word.y})`}
                  fontSize={word.size}
                  fontFamily={word.font}
                >
                  {word.text}
                </Text>
              ))
            }
          </Wordcloud>
        </div>

        <div className=" max-w-lg w-full">
          <Label className=" font-semibold tracking-tight text-lg pb-2">
            Here's what I think about {topicName}
          </Label>
          <div className=" mt-1 flex gap-2 items-center">
            <Input
              value={input}
              onChange={({ target }) => setInput(target.value)}
              placeholder={`${topicName} is absolutely...`}
            />
            <Button
              onClick={() => mutate({ comment: input, topicName })}
              disabled={isPending}
            >
              Share
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ClientPage;