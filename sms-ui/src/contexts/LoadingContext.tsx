import { createContext, useContext, useState } from "react";

type LoadingContextType = {
    loading: boolean;
    setLoading: any;
    loading2: boolean;
    setLoading2: any;
}

export const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: null,
    loading2: false,
    setLoading2: null,
})

const LoadingProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    return <LoadingContext.Provider value={{ loading, setLoading, loading2, setLoading2 }}>
        {children}
    </LoadingContext.Provider>
}

export const useLoading = () => {
    return useContext(LoadingContext);
}

export default LoadingProvider;
