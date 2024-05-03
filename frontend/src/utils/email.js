import { fetcher } from "../store/fetch";

export const sendEmail = async (user_id, subject, message) => {
    const res = await fetcher(`/api/email?user_id=${user_id}&subject=${subject}&message=${message}`, {
        method: 'GET'
    })

    return res;
}