// Custom hook for fetching and managing product data using SWR.
import useSWR from "swr";

const useProducts = ({ category }) => {
  const { data, error } = useSWR(`products/category/${category}`);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProducts;
