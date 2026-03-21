import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  // 1
  const numBookings = bookings.length;

  // 2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3
  const checkIns = confirmedStays.length;
  console.log(checkIns);

  // 4 = num checked in nights / all available nights (num dats * num of cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${(occupation * 100).toFixed(2)}%`}
      />
    </>
  );
};
export default Stats;
