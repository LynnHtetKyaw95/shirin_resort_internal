import { useQuery } from "@tanstack/react-query";
import { getFullGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isPending, data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: getFullGuests,
  });

  return { isPending, guests: guests || [] };
}
