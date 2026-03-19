import { useSearchParams } from "react-router";
import Select from "./Select";

const SortedBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentSortBy}
      onChange={handleChange}
      type="white"
    />
  );
};
export default SortedBy;
