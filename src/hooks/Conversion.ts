import {useCallback, useEffect, useState} from "react";
import {useDataFetching} from "./Fetching";
import {Dataset} from "../constants/constants";
import {imageUrlGenerator} from "../constants/api";


function useConversion<T>(url: string, func: (response: Response | undefined) => Promise<T | undefined>) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<undefined | T>(undefined);
    const [error, setError] = useState("");
    const {loading: rawLoading, results: rawResults, error: rawError} = useDataFetching(url);


    useEffect(() => {
        async function convertData() {
            try {
                if (!rawLoading) {
                    if (rawError) {
                        setError(rawError);
                    } else if (rawResults) {
                        const results = await func(rawResults)
                        if (results) {
                            setResults(results);
                        } else {
                            setError("An error occurred converting raw db response.");
                        }
                    }
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        convertData();

    }, [rawLoading, rawResults, rawError, func]);

    return {
        error,
        loading,
        results
    };
}


export function useDatabaseImageArray(dataset: Dataset, id: number) {
    const imageUrl = imageUrlGenerator({dataset, id});
    const cImageConversion = useCallback(async (response: Response | undefined) => {
        if (response) {
            const ab = await response.arrayBuffer();
            return new Float32Array(ab);
        }
        return undefined
    }, [])

    return useConversion<Float32Array>(imageUrl, cImageConversion);
}
