import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

type ErrorResponse = string | { title: string } | { errors: string[] };

const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include', // allow cookies
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs, 
  api: BaseQueryApi, 
  extraOptions: object
) => {
  // start loading
  api.dispatch(startLoading());
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  api.dispatch(stopLoading())
  if (result.error) {
    const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus
      ? result.error.originalStatus
      : result.error.status

    const responseData = result.error.data as ErrorResponse;

    // const { status, data } = result.error;
    // console.log("Error from Redux middleware: ", { status, data });

    switch (originalStatus) {
      case 400:
        if (typeof responseData === 'string') toast.error(responseData)
        else if ('errors' in responseData) {
          throw Object.values(responseData.errors).flat().join(', ')
        }
        else toast.error(responseData.title)
        break;

      case 401:
        if (typeof responseData === 'object' && 'title' in responseData)
          toast.error(responseData.title)
        break;

      case 404:
        if (typeof responseData === 'object' && 'title' in responseData)
          router.navigate('/not-found')
        break;

      case 500:
        if (typeof responseData === 'object' && 'title' in responseData)
          // toast.error(responseData.title)
          router.navigate('/server-error', {state: {error: responseData}})
        break;
    
      default:
        break;
    }
  }

  return result;
}