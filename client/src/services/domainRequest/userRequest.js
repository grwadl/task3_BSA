import {deleteReq, post, put} from "../requestHelper";
const entity = 'users'

export const createUser = async (body) => {
    return await post(entity, body);
}
export const updateUser = async (body,id) => {
    return await put(entity, id,body);
}
export const deleteUserRequest = async (id) => {
    return await deleteReq(entity, id);
}