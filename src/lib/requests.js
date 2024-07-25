export const get = async (url) => {
    const response = await fetch(url, { 
        cache: 'no-store',
        next: { revalidate: 0 },
    },
);

    return response.json();
}

export const post = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        cache: 'no-store',
        next: { revalidate: 0 },
    });

    return response.json();
}

export const put = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        cache: 'no-store',
        next: { revalidate: 0 },
    });

    return response.json();
}

export const del = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        cache: 'no-store',
        next: { revalidate: 0 },
    });

    if (response.status !== 200) {
        throw new Error('Failed to delete');
    }

    return response.json();
}