import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "check-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      (toast.success(`Booking #${data.id} successfully checked in`),
        queryClient.invalidateQueries({ active: true }));
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkIn, isCheckingIn };
}
