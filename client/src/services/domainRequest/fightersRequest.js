import {get, post, put,deleteReq} from "../requestHelper";

const entity = 'fighters';

export const getFighters = async () => {
    return await get(entity);
}

export const createFighter = async (body) => {
    return await post(entity, body);
}
export const changeFighter = async (id,body) => {
    return await put(entity,id, body);
}
export const deleteFighter = async (id) => {
    return await deleteReq(entity,id);
}