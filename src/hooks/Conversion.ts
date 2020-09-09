import {useCallback, useEffect, useState} from "react";
import {useDataFetching} from "./Fetching";
import {Dataset, InstanceCoord} from "../constants/constants";
import {coordsUrlGenerator, imageUrlGenerator} from "../constants/api";


function useConversion<T>(url: string, func: (response: Response | undefined) => Promise<T | undefined>, request: boolean) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<undefined | T>(undefined);
    const [error, setError] = useState("");
    const {loading: rawLoading, results: rawResults, error: rawError} = useDataFetching(url, request);


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


export function useDatabaseImageArray(dataset: Dataset, id: number, request: boolean) {
    const imageUrl = imageUrlGenerator({dataset, id});
    const cImageConversion = useCallback(async (response: Response | undefined) => {
        if (response) {
            const ab = await response.arrayBuffer();
            return new Float32Array(ab);
        }
        return undefined
    }, [])

    return useConversion<Float32Array>(imageUrl, cImageConversion, request);
}

export function useDatabaseJson<T>(dataset: Dataset, request: boolean) {
    const coordsUrl = coordsUrlGenerator(dataset, []);
    const cJsonConversion = useCallback(async (response) => {
        if (response) {
            return await response.json();
        }
        return undefined
    }, [])

    return useConversion<T>(coordsUrl, cJsonConversion, request);
}

export function useInstanceCoords(dataset: Dataset, controlPoints: InstanceCoord[], request: boolean) {
    const coordsUrl = coordsUrlGenerator(dataset, controlPoints);
    const cJsonConversion = useCallback(async (response) => {
        if (response) {
            return await response.json();
        }
        return undefined
    }, [])

    return useConversion<InstanceCoord[]>(coordsUrl, cJsonConversion, request);
}
