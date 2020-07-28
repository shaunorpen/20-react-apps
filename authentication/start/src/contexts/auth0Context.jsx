import React, { useState, createContext, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export function Auth0Provider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth0Credentials = {
      domain: process.env.REACT_APP_DOMAIN,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: window.location.origin,
    };

    async function initAuth0() {
      const auth0 = await createAuth0Client(auth0Credentials);
      setAuth0Client(auth0);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        try {
          await auth0.handleRedirectCallback();
        } catch (err) {
          console.log(err);
        }

        // window.location.replace(window.location.pathname );
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }

      setIsLoading(false);
    }

    initAuth0();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: (...props) => auth0Client.loginWithRedirect(...props),
        logout: (...props) => auth0Client.logout(...props),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
