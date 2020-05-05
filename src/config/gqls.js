import gql from 'graphql-tag';

let FRAGMENT = {};

FRAGMENT.fragments = {
    PROJECT_COMMON: gql`
        fragment FragmentProject on Project {
            id
            code
            name
            descr
            status
            external_code
            external_url
        }
    `,
    ISSUE_COMMON: gql`
        fragment FragmentIssue on Issue {
            id
            project_id
            code
            summary
            descr
            status
            external_code
            external_url  
        }     
    `
}

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
            ...FragmentProject
        }    
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}
`;

const GET_PROJECT = gql`
    query getProject($id:ID!) {
        project(id:$id) {
            ...FragmentProject
            createdAt
            updatedAt
            issues {
                ...FragmentIssue
            }
        }  
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const CREATE_PROJECT = gql`
    mutation createProject($input:ProjectCreate) {
        createProject(input:$input) {
            ...FragmentProject
        }       
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}
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

const GET_ISSUE_SET = gql`
{
    issues {
        ...FragmentIssue
    }  
}
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const CREATE_ISSUE = gql`
    mutation createIssue($input:IssueCreate) {
        createIssue(input:$input) {
            ...FragmentIssue
        }        
    }
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const DELETE_ISSUE = gql`
    mutation deleteIssue($id:ID!) {
        deleteIssue(id:$id) {
            id
            project_id
            code
            summary
        }
    }
`;

export {
    MESSAGE_BAR_LOCAL,
    GET_PROJECT_SET,
    GET_PROJECT,
    CREATE_PROJECT,
    DELETE_PROJECT,
    GET_ISSUE_SET,
    CREATE_ISSUE,
    DELETE_ISSUE,
}