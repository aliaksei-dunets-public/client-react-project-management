const STATUSES = {
    ACTIVE: {
        code: 'ACTIVE',
        name: 'Active'
    },
    INACTIVE: {
        code: 'INACTIVE',
        name: 'Inactive'
    },
    OBSOLETE: {
        code: 'OBSOLETE',
        name: 'Obsolete'
    },
    NEW: {
        code: 'NEW',
        name: 'New'
    },
    PROGRESS: {
        code: 'PROGRESS',
        name: 'In Progress'
    },
    CLOSED: {
        code: 'CLOSED',
        name: 'Closed'
    },
    DRAFT: {
        code: 'DRAFT',
        name: 'Draft'
    }
};

const PRIORITY = {
    // 1 - Critical, 2 - High, 3 - Medium, 4 - Low
    LOW: {
        code: 'LOW',
        name: 'Low'
    },
    MEDIUM: {
        code: 'MEDIUM',
        name: 'Medium'
    },
    HIGH: {
        code: 'HIGH',
        name: 'High'
    },
    CRITICAL: {
        code: 'CRITICAL',
        name: 'Critical'
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
            path: '/Project Dashboard'
        },
        create_project: {
            name: 'CreateProject',
            path: '/CreateProject'
        },
        issues: {
            name: 'Issues',
            path: '/Issues'
        },
        issue: {
            name: 'Issue',
            path: '/Issue'
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