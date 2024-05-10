import { getItemByID } from "../store/item"

export const getItemsFromNotif = async (notifArr) => {
    let arr = [];
    for (let notif of notifArr){
        let data = await getItemByID(notif.item_id);
        arr.push(data.item);
    }

    return arr;
}