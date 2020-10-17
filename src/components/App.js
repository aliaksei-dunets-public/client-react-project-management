import React from 'react';
import Container from '@material-ui/core/Container';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { IS_LOGGED_IN } from '../config/gqls';

import { Login, Content } from './initilize';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: ( process.env.REACT_APP_SERVER_URI || 'http://localhost:3005') + '/graphql',
  headers: {
    Authorization: localStorage.getItem('auth_server_token')
  },
});

cache.writeData({
  data: {
    messageBarOpen: false,
    messageBarSeverity: 'info',
    messageBarText: '',
    isLoggedIn: !!localStorage.getItem('auth_server_token'),
  },
});

function App() {

  const StartPage = () => {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Content /> : <Login />
  }

  return (
    <Container maxWidth='xl' disableGutters={true}>
      <ApolloProvider client={client}>
        <StartPage />
      </ApolloProvider>
    </Container>
  );
}

export default App;
