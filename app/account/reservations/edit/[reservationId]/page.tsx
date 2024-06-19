import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  const reservationId = params.reservationId;
  const booking = await getBooking(reservationId);
  const cabin = await getCabin(booking.cabin_id);
  const maxCapacity = cabin.max_capacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm>
        <div className="space-y-2">
          <label htmlFor="num_guests">How many guests?</label>
          <select
            name="num_guests"
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={String(booking.num_guests)}
          >
            <option key="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={String(booking?.observations)}
          />
        </div>

        <input type="hidden" name="id" value={booking.id} />
      </UpdateReservationForm>
    </div>
  );
}
