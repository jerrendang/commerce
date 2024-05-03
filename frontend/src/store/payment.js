import { fetcher } from "./fetch"

export const createPaymentIntent = async (items) => {
    // const cost = 0;
    // for (let i in items){
    //     cost += i.price
    // }
    // console.log(cost);
    let cost = 5000;

    const res = await fetcher(`/api/stripe/secret?cost=${cost}`, {
        method: 'GET'
    }) // create payment intent

    const {client_secret} = await res.json();

    return client_secret;
}

export const createCheckoutSession = async (items, stripe_id, user_id, address) => {
    let totalPrice = 0;
    for (let item of items){
        totalPrice += item.price
    }
    let seller_id = items[0].id

    const res = await fetcher(`/api/stripe/checkout?price=${totalPrice}&destination_stripe_account_id=${stripe_id}&user_id=${user_id}&address=${address}&seller_id=${seller_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            items
        })
    })
    
    const data = await res.json();

    return data;
}