import { GRAPHQL_API } from './components/graphql';

export const client = ({ settings, createNetworkInterface }) => {
    if (__WEB__) {
        return {
            networkInterface: createNetworkInterface({ uri: GRAPHQL_API }),
        };
    }
};

export const server = ({ settings, createNetworkInterface, request }) => {
    if (__NODE__) {
        return {
            networkInterface: createNetworkInterface({ uri: GRAPHQL_API }),
        };
    }
};
