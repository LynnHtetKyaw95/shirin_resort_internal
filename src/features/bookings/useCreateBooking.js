import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newBooking) => createBookingAPI(newBooking),
    onSuccess: () => {
      toast.success("New Booking successfully created");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
