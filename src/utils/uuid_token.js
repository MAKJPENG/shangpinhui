import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    // 获取uuid
    let uuid_token = localStorage.getItem('UUID')
    if (!uuid_token) {
        // 如果没有就创建uuid并存储
        uuid_token = uuidv4()
        localStorage.setItem('UUID', uuid_token)
    }
    return uuid_token
}