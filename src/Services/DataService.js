async function Login(userData){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/User/Login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    let data = await res.json();
   return data;
}

async function GetUserByUsername(username){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/User/GetUserByUsername/' + (username));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function AddMWG(newMWG, groupCreatorId){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/MWG/AddMWG/' + (groupCreatorId), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMWG)
    });
    let data = await res.json();
   return data;
}

async function GetAllUsers(){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/User/GetAllUsers');
    let data = await res.json();
    return data;
}

async function AddMemberToMWG(MWGId,newMemberId){
    let res = await fetch(`https://pickflicksapi.azurewebsites.net/User/AddMemberToMWG/${MWGId}/${newMemberId}`);
    let data = await res.json();
    return data;
}



export { Login, GetUserByUsername, AddMWG, GetAllUsers, AddMemberToMWG };