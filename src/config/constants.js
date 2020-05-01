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
        issues: {
            name: 'Issues',
            path: '/Issues'
        },
        timelogs: {
            name: 'Timelogs',
            path: '/Timelogs'
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
    severity: {
        success: "success",
        warning: "warning",
        error: "error",
        info: "info"
    }
}