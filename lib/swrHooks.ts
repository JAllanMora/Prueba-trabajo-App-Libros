import useSWR from "swr";

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

export function useBooks(initialData = {}) {
  const { data, error } = useSWR(`/api/books`, fetcher, {
    ...initialData,
  });
  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  };
}

