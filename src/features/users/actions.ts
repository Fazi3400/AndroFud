"use server";

import db from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { profiles } from "../../lib/supabase/schema";
import { AdminUserFormData } from "@/features/users/validations";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const userResponse = await supabase.auth.getUser();
  return userResponse.data.user;
};
export const getCurrentUserSession = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const userResponse = await supabase.auth.getSession();

  return userResponse.data.session;
};

export const isAdmin = (currentUser: User | null) =>
  currentUser?.app_metadata.isAdmin;

export const getUser = async ({ userId }: { userId: string }) => {
  const cookieStore = await cookies();
  const adminAuthClient = (await createClient({ cookieStore, isAdmin: true }))
    .auth.admin;

  try {
    const { data } = await adminAuthClient.getUserById(userId);
    return data;
  } catch (err) {
    throw new Error("There is an error");
  }
};

export const listUsers = async ({
  page = 1,
  perPage = 10,
}: {
  page?: number;
  perPage?: number;
}) => {
  const cookieStore = await cookies();
  const adminAuthClient = (await createClient({ cookieStore, isAdmin: true }))
    .auth.admin;

  const {
    data: { users },
  } = await adminAuthClient.listUsers({
    page,
    perPage,
  });
  return users;
};

export const createUser = async ({
  email,
  name,
  password,
}: AdminUserFormData) => {
  const cookieStore = await cookies();
  const adminAuthClient = (await createClient({ cookieStore, isAdmin: true }))
    .auth.admin;

  try {
    const existedUser = await db.query.profiles.findFirst({
      where: eq(profiles.email, email),
    });
    if (existedUser) throw new Error(`User with email ${email} is existed.`);

    const res = await adminAuthClient.createUser({
      email,
      password,
      role: "ADMIN",
      user_metadata: { name },
    });

    return res;
  } catch (err) {
    throw new Error("Unexpected error occured.");
  }
};

export const createUserProfile = async ({
  userId,
  email,
  name,
}: {
  userId: string;
  email: string;
  name: string;
}) => {
  try {
    // Use Supabase REST API instead of direct DB connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.DATABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase configuration");
    }

    const { createClient: createSupabaseClient } = await import(
      "@supabase/supabase-js"
    );
    const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("profiles").insert({
      id: userId,
      email,
      name,
      is_admin: false,
    });

    if (error) {
      console.error("Error creating user profile:", error);
      throw new Error(error.message || "Failed to create user profile");
    }

    return { success: true };
  } catch (err) {
    console.error("Error creating user profile:", err);
    throw new Error(
      err instanceof Error ? err.message : "Failed to create user profile",
    );
  }
};
