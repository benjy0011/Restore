import { z } from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, {
  error: "A file must be uoloaded"
});

export const createProductSchema = z.object({
  name: z.string({ 
    error: (issue) => 
      issue.input === undefined ? "Name of product is required" : undefined
  }),
  description: z.string({
    error: (issue) => 
      issue.input === undefined ? "Description is required" : undefined
  }).min(10, {
    error: "Description must be at least 10 characters"
  }),
  price: z.coerce.number({
    error: (issue) => 
      issue.input === undefined ? "Price is required" : undefined
  }).min(100, 'Price must be at least $1.00'),
  type: z.string({ 
    error: (issue) => 
      issue.input === undefined ? "Type is required" : undefined
  }),
  brand: z.string({ 
    error: (issue) => 
      issue.input === undefined ? "Brand is required" : undefined
  }),
  quantityInStock: z.coerce.number({
    error: (issue) => 
      issue.input === undefined ? "Quantity is required" : undefined
  }).min(1, 'Quantity must be at least 1'),
  file: fileSchema
});

export type CreateProductSchema = z.infer<typeof createProductSchema >;