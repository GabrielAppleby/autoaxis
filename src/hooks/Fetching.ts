import {useCallback, useEffect, useState} from "react";

interface FetchFunction<T> {
    (url: string): Promise<T>;
}

function useFetching<T>(url: string, fetchFunc: FetchFunction<T>) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<undefined | T>(undefined);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchFunc(url);
                if (data) {
                    setLoading(false);
                    setResults(data);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, [url, fetchFunc]);

    return {
        error,
        loading,
        results
    };
}

export function useDataFetching(url: string) {
    const cFetch = useCallback(fetch, [])

    return useFetching<Response>(url, cFetch);
}