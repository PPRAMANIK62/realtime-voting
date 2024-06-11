"use client";
import { createTopic } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TopicCreator = () => {
  const [input, setInput] = useState<string>("");

  const { mutate, error, isPending } = useMutation({
    mutationFn: createTopic,
  });

  return (
    <div className=" mt-12 flex flex-col gap-2">
      <div className=" flex gap-2">
        <Input
          value={input}
          onChange={({ target }) => setInput(target.value)}
          className=" min-w-64"
          placeholder="Enter topic here..."
        />
        <Button
          disabled={isPending}
          onClick={() => mutate({ topicName: input })}
        >
          Create
        </Button>
      </div>

      {error ? <p className=" text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
};

export default TopicCreator;
