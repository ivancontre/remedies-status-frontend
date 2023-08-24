import React, { FC } from 'react';
import AppRouter from './routers/AppRouter';
import { LoadingProvider } from './context/LoadingContext';

//import 'animate.css';

const RemediesStatus: FC = () => {   

    return (
        <LoadingProvider>
            <AppRouter />
        </LoadingProvider>
        
        
    )
}

export default RemediesStatus;