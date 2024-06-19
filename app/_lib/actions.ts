"use server";

import { auth, signIn, signOut } from "./auth";
import { updateGuest as update } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  const national_id = formData.get("national_id");
  const [nationality, country_flag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
    throw new Error("Provide a valid national id");
  }

  const updateData = {
    national_id,
    nationality,
    country_flag,
  };
  await update(session?.user?.guestId, updateData);
}
