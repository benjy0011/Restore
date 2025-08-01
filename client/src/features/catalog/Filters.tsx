import {
  Box,
  Button,
  Paper,
} from "@mui/material";

import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import { Clear } from "@mui/icons-material";
import type { Filter } from "../../app/models/filter";

type Props = {
  data: Filter;
  isLoading : boolean;
}


// value need to match API
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const Filters = ({
  data,
  isLoading
}: Props) => {
  
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

      <Button
        onClick={() => dispatch(resetParams())}
        endIcon={<Clear />}
        variant="outlined"
      >
        Reset
      </Button>
    </Box>
  );
};
export default Filters;
