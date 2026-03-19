import { useQuery } from "@tanstack/react-query";
import { getFullBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getFullBookings,
  });

  return { isPending, bookings, error };
}
