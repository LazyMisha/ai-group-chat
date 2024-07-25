export const get = async (url) => {
    const response = await fetch(
        url,
        { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', }
    );

    return response.json();
}

export const post = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    });

    return response.json();
}

export const put = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    });

    return response.json();
}

export const del = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    });

    if (response.status !== 200) {
        throw new Error('Failed to delete');
    }

    return response.json();
}