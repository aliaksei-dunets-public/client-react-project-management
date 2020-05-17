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
    severity: {
        success: "success",
        warning: "warning",
        error: "error",
        info: "info"
    }
}