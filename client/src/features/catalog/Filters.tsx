import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import Search from "./Search";

// value need to match API
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const Filters = () => {
  const { data, isLoading } = useFetchFiltersQuery();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <FormControl>
          {sortOptions.map(({ value, label }) => (
            <FormControlLabel
              key={label}
              control={<Radio sx={{ py: 0.7 }} />}
              label={label}
              value={value}
            />
          ))}
        </FormControl>
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
