"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext<any>({});
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<any>(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Context is used outside provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
