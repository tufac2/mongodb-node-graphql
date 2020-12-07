import GMR from 'graphql-merge-resolvers';
import resolversPlatformType from './platform';
import resolversProductType from './product';
import resolversShopProductTypes from './shop-product';

const typeResolvers = GMR.merge([
    resolversShopProductTypes,
    resolversPlatformType,
    resolversProductType
]);

export default typeResolvers;