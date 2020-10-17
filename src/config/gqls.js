import gql from 'graphql-tag';

let FRAGMENT = {};

const MESSAGE_BAR_LOCAL = gql`
    query getMessageBar { 
        messageBarOpen @client
        messageBarSeverity @client
        messageBarText @client
    }
`;

const IS_LOGGED_IN = gql`
    query isUserLoggedIn {        
        isLoggedIn @client
    }
`;


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
            priority
            external_code
            external_url  
        }     
    `,
    SUB_ISSUE_COMMON: gql`
        fragment FragmentSubIssue on SubIssue {
            id
            project_id
            issue_id
            summary
            descr
            status
            priority 
        }     
    `,
    TIMELOG_COMMON: gql`
        fragment FragmentTimelog on Timelog {
            id
            project_id
            issue_id
            dateLog
            valueLog
            descr
            paidUp
        }
    `,
}

const LOGIN_USER = gql`
    mutation loginUser($email:String!, $password:String!) {
        login(email:$email, password:$password)       
    }
`;

const GET_PROJECT_SET = gql`
    query getProjects($status:ProjectStatus) {
        projects(status: $status) {
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
        }  
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}    
`;

const GET_PROJECT_ISSUE_SET = gql`
    query getProject($id:ID!) {
        project(id:$id) {
            id
            external_url
            issues {
                ...FragmentIssue
            }
        }  
    }
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

const UPDATE_PROJECT = gql`
    mutation updateProject($id:ID!, $input:ProjectEdit) {
        updateProject(id:$id, input:$input) {
            ...FragmentProject
        }       
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}
`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id:ID!,$deleteChild:Boolean) {
        deleteProject(id:$id,deleteChild:$deleteChild) {
            id
            code
            name
        }
    }
`;

const GET_ISSUE_SET = gql`
    query getIssues($statuses: [IssueStatus]) {
        issues(statuses: $statuses) {
            ...FragmentIssue
        }  
    }
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const GET_ISSUE = gql`
    query getIssue($id:ID!) {
        issue(id:$id) {
            ...FragmentIssue
            timelogs {
            ...FragmentTimelog
            }
            subIssues {
            ...FragmentSubIssue
            }
        }  
    }
    ${FRAGMENT.fragments.ISSUE_COMMON}
    ${FRAGMENT.fragments.TIMELOG_COMMON}
    ${FRAGMENT.fragments.SUB_ISSUE_COMMON}
`;

const CREATE_ISSUE = gql`
    mutation createIssue($input:IssueCreate) {
        createIssue(input:$input) {
            ...FragmentIssue
        }        
    }
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const UPDATE_ISSUE = gql`
    mutation updateIssue($id:ID!, $input:IssueEdit) {
        updateIssue(id:$id, input:$input) {
            ...FragmentIssue
        }        
    }
    ${FRAGMENT.fragments.ISSUE_COMMON}
`;

const DELETE_ISSUE = gql`
    mutation deleteIssue($id:ID!,$deleteChild:Boolean) {
        deleteIssue(id:$id,deleteChild:$deleteChild) {
            id
            project_id
            code
            summary
        }
    }
`;

const CREATE_SUB_ISSUE = gql`
    mutation createSubIssue($input:SubIssueCreate) {
        createSubIssue(input:$input) {
            ...FragmentSubIssue
        }        
    }
    ${FRAGMENT.fragments.SUB_ISSUE_COMMON}
`;

const UPDATE_SUB_ISSUE = gql`
    mutation updateSubIssue($id:ID!, $input:SubIssueEdit) {
        updateSubIssue(id:$id, input:$input) {
            ...FragmentSubIssue
        }        
    }
    ${FRAGMENT.fragments.SUB_ISSUE_COMMON}
`;

const DELETE_SUB_ISSUE = gql`
    mutation deleteSubIssue($id:ID!) {
        deleteSubIssue(id:$id) {
            id
            project_id
            issue_id
            summary
        }
    }
`;

const GET_TIMELOG_SET = gql`
{
    timelogs {
        ...FragmentTimelog
    }  
}
    ${FRAGMENT.fragments.TIMELOG_COMMON}
`;

const CREATE_TIMELOG = gql`
    mutation createTimelog($input:TimelogCreate) {
        createTimelog(input:$input) {
            ...FragmentTimelog
        }        
    }
    ${FRAGMENT.fragments.TIMELOG_COMMON}
`;

const CREATE_MULTI_TIMELOG = gql`
    mutation createMultiTimelogs($input:[TimelogCreate]) {
        createMultiTimelogs(input:$input) {
            ...FragmentTimelog
        }        
    }
    ${FRAGMENT.fragments.TIMELOG_COMMON}
`;

const UPDATE_TIMELOG = gql`
    mutation updateTimelog($id:ID!, $input:TimelogEdit) {
        updateTimelog(id:$id, input:$input) {
            ...FragmentTimelog
        }        
    }
    ${FRAGMENT.fragments.TIMELOG_COMMON}
`;

const DELETE_TIMELOG = gql`
    mutation deleteTimelog($id:ID!) {
        deleteTimelog(id:$id) {
            id
            project_id
            issue_id
            dateLog
        }
    }
`;

const TIMESHEET_SET = gql`
    query getTimesheet($startDate:Date,$endDate:Date,$project_id: String) {
        timesheet(startDate:$startDate,endDate:$endDate,project_id:$project_id) {
            projects {
                ...FragmentProject
            }
            issues {
                ...FragmentIssue
            }
            timelogs {
                ...FragmentTimelog
            }
        }  
    }
    ${FRAGMENT.fragments.PROJECT_COMMON}
    ${FRAGMENT.fragments.ISSUE_COMMON}
    ${FRAGMENT.fragments.TIMELOG_COMMON}
`;

const REPORT = gql`
    query getReport {
        report {
            filename
        }  
    }
`;

export {
    MESSAGE_BAR_LOCAL,
    IS_LOGGED_IN,
    FRAGMENT,
    LOGIN_USER,
    GET_PROJECT_SET,
    GET_PROJECT,
    GET_PROJECT_ISSUE_SET,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    GET_ISSUE_SET,
    GET_ISSUE,
    CREATE_ISSUE,
    UPDATE_ISSUE,
    DELETE_ISSUE,
    CREATE_SUB_ISSUE,
    UPDATE_SUB_ISSUE,
    DELETE_SUB_ISSUE,
    GET_TIMELOG_SET,
    CREATE_TIMELOG,
    CREATE_MULTI_TIMELOG,
    UPDATE_TIMELOG,
    DELETE_TIMELOG,
    TIMESHEET_SET,
    REPORT
}