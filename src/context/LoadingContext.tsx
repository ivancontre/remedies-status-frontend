import React, { createContext, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

type GlobalContentUI = {
    loading: boolean;
    showLoading: Function;
    hideLoading: Function;
};

export const LoadingContext = createContext<GlobalContentUI>({
    loading: false,
    showLoading: () => {},
    hideLoading: () => {},
});

export const LoadingProvider = ({ children }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const showLoading = () => {
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    return (
        <LoadingContext.Provider value={ { loading, showLoading, hideLoading } }>
            { children }
        </LoadingContext.Provider>
    )

};