import Cookies from 'js-cookie';

export const fetcher = async (url, options) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    options.credentials = 'include';

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = 
            options.headers['Content-Type'] || 'application/json';
    }

    url = process.env.NODE_ENV === 'production' ? 'https://commerce-2mri.onrender.com' + url : 'http://localhost:8000' + url ///////////////////////////// fix production url

    const res = await fetch(url, options);

    if (res.status >= 400) {
        throw await res.json();
    };

    return res;
}

export const getUserOrders = async (buyer_id) => {
    const res = await fetcher(`/api/order?buyer_id=${buyer_id}`, {
        method: 'GET'
    })

    const data = res.json();

    return data;
}