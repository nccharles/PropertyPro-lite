export const findError = res => res.status(500).json({
    status: 'error',
    error: "Something went wrong. Try again later"
});
export const serverFeedback = (res, status, ...[statusKey, statusResult, Key, Value]) => res.status(status).json({
    [statusKey]: statusResult,
    [Key]: Value
});
export const authFeedback = (res, status, ...[Key, Value]) => res.status(status).json({
    status: 'error',
    [Key]: Value
});
export const userFeedback = (res, status, userData) => res.status(status).json({
    status: 'success',
    data: userData
});

