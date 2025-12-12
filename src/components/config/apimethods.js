// Placeholder for API methods configuration
// This file is imported by BASearchLookup but the component primarily uses apiFunctions prop.
// This export ensures the import doesn't fail.

const createApiFunction = () => {
    return {
        Get: async () => ({ items: [], meta: { totalItems: 0 } }),
        Post: async () => { },
        Put: async () => { },
        Delete: async () => { }
    };
};

export default createApiFunction;
