import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGetAllCabins } from "../cabins/useGetAllCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isPending: bookingsLoading, bookings } = useRecentBookings();
  const { isPending: staysLoading, confirmStays, numDays } = useRecentStays();

  const { isPending: cabinLoading, cabins } = useGetAllCabins();

  if (bookingsLoading || staysLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;
