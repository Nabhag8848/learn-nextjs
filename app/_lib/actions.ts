"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateGuest as update,
  updateBooking,
} from "./data-service";
import { redirect } from "next/navigation";

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

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((b) => b.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((b) => b.id);
  const id = Number(formData.get("id"));

  if (!guestBookingIds.includes(id)) {
    throw new Error("You are not allowed to update this booking");
  }

  await updateBooking(id, {
    observations: formData.get("observations"),
    num_guests: Number(formData.get("num_guests")),
  });

  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}
