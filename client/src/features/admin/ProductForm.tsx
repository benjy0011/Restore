import { Controller, useForm } from "react-hook-form"
import { createProductSchema, type CreateProductSchema } from "../../lib/schemas/createProductSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"

interface Props {
  setEditMode: (editMode: boolean) => void
}

export const ProductForm = ({
  setEditMode,
}: Props) => {
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (data: CreateProductSchema) => {
    console.log(data);
  }

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" sx={{mb: 4}}>
        Product details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Controller
              render={({ field }) => 
                <TextField 
                  {...field} 
                  fullWidth 
                  label='Name'                  
                />
              }
              name='name'
              control={control}
            />
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={() => setEditMode(false)}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  )
}