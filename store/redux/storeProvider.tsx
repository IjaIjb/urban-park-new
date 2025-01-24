'use client';
import React, { useRef, useState, useEffect } from 'react';
import { AppStore, makeStore } from './store';
import { Provider } from 'react-redux';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [store, setStore] = useState<AppStore | null>(null);

    useEffect(() => {
        // Lazily create the store on the client side
        const appStore = makeStore();
        setStore(appStore);

        // Subscribe to state changes
        appStore.subscribe(() => {
            const state = appStore.getState();
            if (state?.auth?.user) {
                localStorage.setItem('user', JSON.stringify(state.auth.user));
            }
            if (state?.auth?.authToken) {
                localStorage.setItem('auth_token', state.auth.authToken);
            }
        });
    }, []);

    // Render only when the store is initialized
    if (!store) return null;

    return <Provider store={store}>{children}</Provider>;
}



// 'use client';
// import React, { useRef } from 'react';
// import { AppStore, makeStore } from './store';
// import { Provider } from 'react-redux';

// export default function StoreProvider({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     const storeRef = useRef<AppStore>();
//     if (storeRef.current === undefined) {
//         storeRef.current = makeStore()
//     }
//     if (storeRef.current) {
//         storeRef.current.subscribe(() => {
//             const state = storeRef.current?.getState();
//             if (state?.auth?.user) { localStorage.setItem('user', JSON.stringify(state.auth.user)); }
//             if (state?.auth?.authToken) { localStorage.setItem('auth_token', state.auth.authToken); }
//         });
//     }
//     return (<Provider store={storeRef.current}> {children} </Provider>)
// }