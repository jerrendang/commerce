import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { fetcher } from "./fetch";

const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY
    }
})

export const createItem = async ({userID, price, name, description, category, binary, key}) => {
    const photoKey = `${userID}${key}`
    await s3Client.send(
        new PutObjectCommand({
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
            Key: photoKey,
            Body: binary,
            ContentType: 'image/png'
        })
    )

    const res = await fetcher('/api/item', {
        method: 'POST',
        body: JSON.stringify({
            userID,
            price,
            name,
            description,
            category,
            photo_key: photoKey
        })
    });

    if (res.ok){
        return true;
    }
}

export const deleteItem = async (item_id, photo_key) => {
    const data = await s3Client.send(
        new DeleteObjectCommand({
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
            Key: photo_key
        })
    )

    const res = await fetcher(`/api/item?item_id=${item_id}`, {
        method: 'DELETE'
    });

    if (res.ok){
        return res.json();
    }
}

export const editItemFunc = async (item_id, field, value) => {
    const res = await fetcher(`/api/item?item_id=${item_id}&field=${field}&value=${value}`, {
        method: 'PUT'
    })

    if (res.ok){
        return await res.json();
    }
}

export const getItem = async (user_id, sold) => {
    const res = await fetcher(`/api/item?user_id=${user_id}&sold=${sold}`, {
        method: 'GET'
    })
    
    if (res.ok){
        return await res.json();
    }
}

export const getItemByID = async (item_id) => {
    const res = await fetcher(`/api/item/${item_id}`, {
        method: 'GET'
    })

    if (res.ok){
        return await res.json()
    }
}

export const getExploreItems = async (category, count, page, user_id) => {
    const res = await fetcher(`/api/item/explore?category=${category}&count=${count}&page=${page}&user_id=${user_id}`, {
        method: 'GET'
    })   

    if (res.ok){
        return await res.json(); // {items}
    }
}

export const signURL = async (key) => {
    const params = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: key,
        Region: process.env.REACT_APP_AWS_REGION
    };
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
    });
    
    return signedUrl;
}