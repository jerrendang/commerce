const {fetcher} = require('./fetch');

export const createStripeAccount = async (user_id) => {
    const res = await fetcher('/api/stripe/account', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })

    const {user} = await res.json();

    return user;
}

export const createAccountLink = async (stripe_id, user_id) => {
    const res = await fetcher('/api/stripe/accountlink', {
        method: 'POST',
        body: JSON.stringify({
            account_id: stripe_id,
            refresh_url: `http://localhost:3000`,
            return_url: `http://localhost:8000/api/stripe/return?user_id=${user_id}&stripe_account=${stripe_id}`
        })
    });

    const {url} = await res.json();

    return url;
}