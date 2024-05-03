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
            refresh_url: `https://commerce-gfue2f5gm-jerrendangs-projects.vercel.app`,
            return_url: `https://commerce-2mri.onrender.com/api/stripe/return?user_id=${user_id}&stripe_account=${stripe_id}`
        })
    });

    const {url} = await res.json();

    return url;
}