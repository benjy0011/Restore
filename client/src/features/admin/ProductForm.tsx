import { useForm } from "react-hook-form"
import { createProductSchema } from "../../lib/schemas/createProductSchema"
import { zodResolver } from "@hookform/resolvers/zod"

export const ProductForm = () => {
  const { register } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createProductSchema),
  })

  return (
    <div>ProductForm</div>
  )
}