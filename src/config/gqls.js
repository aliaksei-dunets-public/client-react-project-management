import gql from 'graphql-tag';

const MESSAGE_BAR_LOCAL = gql`
    query getMessageBar { 
        messageBarOpen @client
        messageBarSeverity @client
        messageBarText @client
    }
`;

const GET_PROJECT_SET = gql`
{
    projects {
        id
        code
        name
        descr
        status
        external_code
        external_url
    }  
}`;

const CREATE_PROJECT = gql`
    mutation createProject($input:ProjectCreate) {
        createProject(input:$input) {
            id
            code
            name
            descr
            status
            external_code
            external_url
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id:ID!) {
        deleteProject(id:$id) {
            id
            code
            name
        }
    }
`;


export {
    MESSAGE_BAR_LOCAL,
    GET_PROJECT_SET,
    CREATE_PROJECT,
    DELETE_PROJECT
}