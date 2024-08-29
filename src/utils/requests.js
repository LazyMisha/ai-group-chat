export const get = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const post = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to post! status: ${response.status}`);
    }

    return response.json();
}

export const put = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to put! status: ${response.status}`);
    }

    return response.json();
}

export const del = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete! status: ${response.status}`);
    }

    return response.json();
}