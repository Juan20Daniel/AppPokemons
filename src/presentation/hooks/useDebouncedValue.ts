import { useEffect, useState } from 'react';

export const useDebouncedValue = (input:string = '', time:number = 500) => {
    const [debounced, setDebounced] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebounced(input);
        },time);

        return () => {
            clearTimeout(timeout);
        }

    },[input]);

    return {debounced}
}
