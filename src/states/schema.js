import gql from 'graphql-tag';

const typeDefs = gql`
    type Query {
        updateDialog: UpdateDialog
    }    

    type UpdateDialog {
        open: Boolean
        title: String
    }
`;

export default typeDefs;