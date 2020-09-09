import {useCallback, useEffect, useState} from "react";

interface FetchFunction<T> {
    (url: string): Promise<T>;
}

function useFetching<T>(url: string, fetchFunc: FetchFunction<T>, request: boolean) {
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
        if (request) {
            fetchData();
        }
    }, [url, fetchFunc, request]);

    return {
        error,
        loading,
        results
    };
}

export function useDataFetching(url: string, request: boolean) {
    const cFetch = useCallback(fetch, [])

    return useFetching<Response>(url, cFetch, request);
}