const STATUSES = {
    // 10 - PROGRESS, 20 - NEW, 30 - HOLD, 40 - READY, 50 - CLOSED
    ACTIVE: {
        code: 'ACTIVE',
        name: 'Active',
        value: 1
    },
    INACTIVE: {
        code: 'INACTIVE',
        name: 'Inactive',
        value: 2
    },
    OBSOLETE: {
        code: 'OBSOLETE',
        name: 'Obsolete',
        value: 3
    },
    NEW: {
        code: 'NEW',
        name: 'New',
        value: 20
    },
    PROGRESS: {
        code: 'PROGRESS',
        name: 'In Progress',
        value: 10
    },
    CLOSED: {
        code: 'CLOSED',
        name: 'Closed',
        value: 50
    },
    HOLD: {
        code: 'HOLD',
        name: 'On Hold',
        value: 30
    },
    READY: {
        code: 'READY',
        name: 'Ready',
        value: 40
    },
    DRAFT: {
        code: 'DRAFT',
        name: 'Draft',
        value: 20
    }
};

const PRIORITY = {
    // 1 - Critical, 2 - High, 3 - Medium, 4 - Low
    LOW: {
        code: 'LOW',
        name: 'Low',
        value: 4
    },
    MEDIUM: {
        code: 'MEDIUM',
        name: 'Medium',
        value: 3
    },
    HIGH: {
        code: 'HIGH',
        name: 'High',
        value: 2
    },
    CRITICAL: {
        code: 'CRITICAL',
        name: 'Critical',
        value: 1
    },
}

module.exports = {
    nav: {
        home: {
            name: 'Home',
            path: '/'
        },
        projects: {
            name: 'Projects',
            path: '/Projects'
        },
        project: {
            name: 'Project',
            path: '/Project'
        },
        dashboard: {
            name: 'Dashboard',
            path: '/ProjectDashboard'
        },
        create_project: {
            name: 'Create Project',
            path: '/CreateProject'
        },
        update_project: {
            name: 'Update Project',
            path: '/UpdateProject'
        },
        issues: {
            name: 'Issues',
            path: '/Issues'
        },
        open_issues: {
            name: 'Open Issues',
            path: '/OpenIssues'
        },
        issue: {
            name: 'Issue',
            path: '/Issue'
        },
        create_issue: {
            name: 'Create Issue',
            path: '/CreateIssue'
        },
        update_issue: {
            name: 'Update Issue',
            path: '/UpdateIssue'
        },
        timelogs: {
            name: 'Timelogs',
            path: '/Timelogs'
        },
        timesheet: {
            name: 'Timesheet',
            path: '/Timesheet'
        },
        projections: {
            name: 'Projections',
            path: '/Projections'
        },
        versions: {
            name: 'Versions',
            path: '/Versions'
        },
        stories: {
            name: 'Stories',
            path: '/Stories'
        },
        tasks: {
            name: 'Tasks',
            path: '/Tasks'
        }
    },
    statuses: STATUSES,
    priority: PRIORITY,
    projectStatuses: [
        STATUSES.INACTIVE,
        STATUSES.ACTIVE,
        STATUSES.OBSOLETE
    ],
    issueStatuses: [
        STATUSES.NEW,
        STATUSES.PROGRESS,
        STATUSES.READY,
        STATUSES.HOLD,
        STATUSES.CLOSED
    ],
    issuePriority: [
        PRIORITY.LOW,
        PRIORITY.MEDIUM,
        PRIORITY.HIGH,
        PRIORITY.CRITICAL
    ],
    severity: {
        success: "success",
        warning: "warning",
        error: "error",
        info: "info"
    }
}