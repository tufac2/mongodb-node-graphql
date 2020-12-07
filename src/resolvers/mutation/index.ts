import GMR from 'graphql-merge-resolvers';
import resolversCategoryMutation from './category';
import resolversUserMutation from './user';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversCategoryMutation

]);

export default mutationResolvers;