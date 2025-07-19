import { Box, Pagination, Typography } from "@mui/material"
import type { Pagination as PaginationType } from "../../models/pagination"

type Props = {
  metadata: PaginationType
  onPageChange: (page: number) => void
}

const AppPagination = ({
  metadata,
  onPageChange
}: Props) => {

  const { currentPage, totalPages, pageSize, totalCount } = metadata;
  
  const startItem = (currentPage - 1) * pageSize;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3
      }}
    >
      <Typography>
        Displaying {startItem + 1}-{endItem} of {totalCount} items
      </Typography>
      <Pagination
        color='primary'
        size='large'
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />

    </Box>
    
  )
}
export default AppPagination