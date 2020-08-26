import React, { useContext } from 'react';
import AppRoutes from './Routes';
import Header from '../components/Header/';
import GlobalStyle from '../global/styles/';
import { AuthProvider, AuthContext } from '../global/contexts/Auth';
import { Loading } from '../global/styles/components';

const AppContexted = () => {
    const { isAuthRequestPeding } = useContext(AuthContext);

    return (
        <>
            {isAuthRequestPeding ? (
                <Loading isPageLoading />
            ) : (
                <>
                    <GlobalStyle />
                    <AuthProvider>
                        <>
                            <Header />
                            <AppRoutes />
                        </>
                    </AuthProvider>
                </>
            )}
        </>
    );
};

const App = () => (
    <AuthProvider>
        <AppContexted />
    </AuthProvider>
);

export default App;
