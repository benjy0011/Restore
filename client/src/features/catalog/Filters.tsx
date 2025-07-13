import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setOrderBy } from "./catalogSlice";

// value need to match API
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const Filters = () => {
  const { data, isLoading } = useFetchFiltersQuery();
  const { orderBy } = useAppSelector(state => state.catalog);
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
        {isLoading ? (
          <CircularProgressScreen size="20px" />
        ) : (
          <FormGroup>
            {data &&
              data.brands.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      color="secondary"
                      sx={{ py: 0.7, fontSize: 40 }}
                    />
                  }
                  label={item}
                />
              ))}
          </FormGroup>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        {isLoading ? (
          <CircularProgressScreen size="20px" />
        ) : (
          <FormGroup>
            {data &&
              data.types.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      color="secondary"
                      sx={{ py: 0.7, fontSize: 40 }}
                    />
                  }
                  label={item}
                />
              ))}
          </FormGroup>
        )}
      </Paper>
    </Box>
  );
};
export default Filters;
