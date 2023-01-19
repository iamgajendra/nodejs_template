exports.respondOk = (data, message) => {
    return {
        status: 200,
        entity: data,
        message
    }
}

exports.respondError = (status, message) => {
    return {
        status,
        message
    }
}