export function cast2array(data) {
    if(!data) return []
    return Array.isArray(data) ? data : [data]
}