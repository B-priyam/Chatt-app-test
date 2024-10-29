export type user = {
    name : string,
    id : string,
    activeChat : string,
    isOnline : boolean,
    users : user[],
    lastMessage : {content:string},
    userData : {name:string}

}