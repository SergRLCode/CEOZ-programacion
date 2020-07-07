import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const token = sessionStorage.getItem('token');

const httpLink = createHttpLink({
  uri: 'https://apps-ceoz.herokuapp.com/graphql',
});

const subscriptionClient = new SubscriptionClient('wss://apps-ceoz.herokuapp.com/subscriptions', {
  reconnect: true,
  lazy: true,
  connectionParams: {
    headers: {
      authorization: !!token ? `${token}` : '',
    },
  },
});

const wsLink = new WebSocketLink(subscriptionClient);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_: any, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: !!token ? `${token}` : 'No auth',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
