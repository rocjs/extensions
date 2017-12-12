import { GRAPHQL_API } from './components/graphql';

export const client = ({ settings, createHttpLink }) => {
    if (__WEB__) {
        console.log('client', createHttpLink);
        return {
            link: createHttpLink({ uri: GRAPHQL_API }),
        };
    }
};

export const server = ({ settings, createHttpLink, request }) => {
    if (__NODE__) {
        console.log('server', createHttpLink);
        return {
            link: createHttpLink({ uri: GRAPHQL_API }),
        };
    }
};
