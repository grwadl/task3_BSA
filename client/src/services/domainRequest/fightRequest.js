import {post, put} from "../requestHelper";
const entity = 'fights'
export const createFight = async (body) => {
    return await post(entity, body);
}
export const logFight = async ( id, body) => {
    return await put(entity,id, body);
}