import React, { useState, useEffect } from "react";

const useDebounce = <T>(input: T, delay: number = 400): T => {
    const [debounceVal, setDebounceVal] = useState<T>(input);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceVal(input);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [input, delay]);

    return debounceVal;
};

export default useDebounce;
