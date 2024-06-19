"use client";
import { updateReservation } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateReservationForm({ children }) {
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateReservation}
    >
      {children}
      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update reservation"}
    </button>
  );
}

export default UpdateReservationForm;
