import {
  Box,
  Paper,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

// value need to match API
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const Filters = () => {
  const { data, isLoading } = useFetchFiltersQuery();
  const { orderBy, types, brands } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={e => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        {isLoading || !data?.brands || !data?.types ? (
          <CircularProgressScreen size="20px" />
        ) : (
          <CheckboxButtons
            items={data.brands}
            checked={brands}
            onChange={(items: string[]) => dispatch(setBrands(items))}
          />
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        {isLoading || !data?.brands || !data?.types ? (
          <CircularProgressScreen size="20px" />
        ) : (
          <CheckboxButtons
            items={data.types}
            checked={types}
            onChange={(items: string[]) => dispatch(setTypes(items))}
          />
        )}
      </Paper>
    </Box>
  );
};
export default Filters;
