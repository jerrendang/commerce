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
