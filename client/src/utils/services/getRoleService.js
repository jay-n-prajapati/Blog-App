export const getRole = (user ,admin ,subAdmin) =>{
    return user ? user : admin ? admin : subAdmin ? subAdmin : null
}