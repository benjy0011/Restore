import { useForm } from "react-hook-form"
import { createProductSchema, type CreateProductSchema } from "../../lib/schemas/createProductSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { AppTextInput } from "../../app/shared/components/AppTextInput"
import { useFetchFiltersQuery } from "../catalog/catalogApi"
import { AppSelectInput } from "../../app/shared/components/AppSelectInput"
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen"
import { AppDropZone } from "../../app/shared/components/AppDropZone"
import { useEffect, useState } from "react"

interface Props {
  setEditMode: (editMode: boolean) => void
}

export const ProductForm = ({
  setEditMode,
}: Props) => {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createProductSchema),
  })

  const watchFile = watch('file');
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!watchFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(watchFile);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [watchFile]);

  const { data, isLoading } = useFetchFiltersQuery();

  const onSubmit = (data: CreateProductSchema) => {
    console.log(data);
  }

  if (isLoading) return (<CircularProgressScreen />)

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" sx={{mb: 4}}>
        Product details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            {/* <Controller
              render={({ field }) => 
                <TextField 
                  {...field} 
                  fullWidth 
                  label='Name'                  
                />
              }
              name='name'
              control={control}
            /> */}

            <AppTextInput control={control} name="name" label="Product Name" />
          </Grid>

          <Grid size={6}>
            {data?.brands &&
              <AppSelectInput
                control={control}
                name="brand"
                label="Brand"
                items={data.brands}
              />
            }
            
          </Grid>

          <Grid size={6}>
            {data?.types &&
              <AppSelectInput
                control={control}
                name="type"
                label="Type"
                items={data.types}
              />
            }
            
          </Grid>

          <Grid size={6}>
            <AppTextInput type="number" control={control} name="price" label="Price (in cents)" />
          </Grid>

          <Grid size={6}>
            <AppTextInput type="number" control={control} name="quantityInStock" label="Quantity in stock" />
          </Grid>

          <Grid size={12}>
            <AppTextInput multiline rows={4} control={control} name="description" label="Description" />
          </Grid>

          <Grid size={12} display='flex' justifyContent='space-between' alignItems='center' gap={2}>
            <AppDropZone control={control} name="file" />
            {preview && (
              <img src={preview} alt='Preview of image' style={{ maxHeight: 200, flex: 1, maxWidth: '40%' }} />
            )}
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