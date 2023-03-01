import useSWR from "swr";

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

export function useBooks(fallbackData = {}) {
  const { data, error } = useSWR(`/api/books`, fetcher, {
    ...fallbackData,
  });
  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  };
}

