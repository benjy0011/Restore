import { z } from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, {
  error: "A file must be uploaded"
});

export const createProductSchema = z.object({
  name: z.string({ 
    error: "Name of product is required"
  }).min(1, "Name of product is required"), // Add this to catch empty strings
  
  description: z.string({
    error: "Description is required"
  }).min(10, "Description must be at least 10 characters"),
  
  price: z.coerce.number({
    error: "Price is required"
  }).min(100, 'Price must be at least $1.00'),
  
  type: z.string({ 
    error: "Type is required"
  }).min(1, "Type is required"), // Add this to catch empty strings
  
  brand: z.string({ 
    error: "Brand is required"
  }).min(1, "Brand is required"), // Add this to catch empty strings
  
  quantityInStock: z.coerce.number({
    error: "Quantity is required"
  }).min(1, 'Quantity must be at least 1'),
  
  pictureUrl: z.string().optional(),
  file: fileSchema.optional()
}).refine((data) => data.pictureUrl || (data.file && data.file instanceof File) , {
  error: 'Please provide an image',
  path: ['file']
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;