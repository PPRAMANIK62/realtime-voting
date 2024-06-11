"use server";

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

export const createTopic = async ({ topicName }: { topicName: string }) => {
  const regex = /^[a-zA-Z-]+$/;

  if (!topicName || topicName.length > 50)
    return { error: "Name must be between 1 and 50 characters" };

  if (!regex.test(topicName))
    return { error: "Only letters and hyphens allowed in topic name" };

  await redis.sadd("existing-topic", topicName);

  redirect(`/${topicName}`);
};
