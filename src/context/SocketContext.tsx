import React, { createContext, useEffect, useRef, useState } from 'react';
import {  useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import webSocketCustom from 'react-use-websocket';
import { ReadyState } from 'react-use-websocket';
import { RootState } from '../store';
// Todo lo que se defina aquí estará disponible en sus hijos

type Props = {
    children: React.ReactNode;
};

export type GlobalContentSocket = {
    online: boolean;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
};

export const SocketContext = createContext<GlobalContentSocket>({
    online: false
});

export const SocketProvider = ({ children }: Props) => {

    const wsClient = useRef<any>(null);

    const [ online, setOnline ] = useState(false);

    const { logged, id } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if ( true ) {
            console.log('sdasdasd')
            wsClient.current = webSocketCustom('wss://remedies-status-backend-9767cddcb0a5.herokuapp.com');
            
        }
    }, [ logged, webSocketCustom ]);

    // useEffect(() => {

    //     if ( !logged ) {
    //         wsClient.current.
    //     }
        
    // }, [ logged, desconectarSocket ]);

    useEffect(() => {
        setOnline( ReadyState.OPEN === 1 ? true : false );
    }, [ReadyState])
    

    return (
        <SocketContext.Provider value={ {socket: wsClient.current, online} }>
            { children }
        </SocketContext.Provider>
    )
};