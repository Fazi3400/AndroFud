"use server";
import { env } from "@/env.mjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const bufferToFile = (buffer: Buffer) =>
  `data:image/webp;base64,${buffer.toString("base64")}`;

export interface UploadImageParams {
  bucket: string;
  path: string;
  file: Buffer;
  contentType: string;
}

export const uploadImage = async (params: UploadImageParams) => {
  const { bucket, path, file, contentType } = params;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType,
      upsert: false,
    });

  if (error) throw new Error(error.message);
  return data;
};
