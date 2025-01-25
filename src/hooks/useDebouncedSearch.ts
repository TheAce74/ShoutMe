import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function useDebouncedSearch(defaultSearch?: string, delay?: number) {
  const [search, setSearch] = useState(defaultSearch ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(defaultSearch ?? "");

  // Debounce callback
  const debounce = useDebouncedCallback(
    // function
    (search) => {
      setDebouncedSearch(search);
    },
    // delay in ms
    delay ?? 1000
  );

  useEffect(() => {
    debounce(search);
  }, [search, debounce]);

  return { search, setSearch, debouncedSearch };
}

export { useDebouncedSearch };
