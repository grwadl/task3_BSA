import {post, put,get} from "../requestHelper";
const entity = 'fights'
export const createFight = async (body) => {
    return await post(entity, body);
}
export const logFight = async ( id, body) => {
    return await put(entity,id, body);
}
export const getFights = async () => {
    return await get(entity);
}