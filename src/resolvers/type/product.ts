import { IResolvers } from 'graphql-tools';

// We do this because good Apollo Practises we need to use ProducID and in database we have product-id
const resolversProductType: IResolvers = {
    Product: {
        screenshoot: (parent) => {
            return parent.shortScreenshots;
        }
    }
};

export default resolversProductType;