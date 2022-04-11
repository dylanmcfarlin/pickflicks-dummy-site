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

async function AddUser(newUserData){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/User/AddUser', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
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

async function AddMWG(newMWG){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/MWG/AddMWG', {
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

async function GetAllCreatedMWGByUserId(userId){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetAllCreatedMWGByUserId/' + (userId));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function GetAllMWGAUserIsMemberOfuserId(userId){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetAllMWGAUserIsMemberOf/' + (userId));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function GetMWGByMWGName(mwgName){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetMWGByMWGName/' + (mwgName));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}


async function EditMWG(MWG){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/MWG/EditMWG', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(MWG)
    });
    let data = await res.json();
    return data;
}

async function EditMWGName(oldMWGName,updatedMWGName){
    let res = await fetch(`https://pickflicksapi.azurewebsites.net/MWG/EditMWGName/${oldMWGName}/${updatedMWGName}`);
    let data = await res.json();
    return data;
}
async function DeleteMemberFromMWG (MWGId,deletedMemberId,deleteMemberName){
    let res = await fetch(`https://pickflicksapi.azurewebsites.net/MWG/DeleteMemberFromMWG/${MWGId}/${deletedMemberId}/${deleteMemberName}`);
    let data = await res.json();
    return data;
}

async function AddMovieToMWG(newMovie){
    let res= await fetch(`http://localhost:5238/Movie/AddMovie`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
    });
    let data = await res.json();
   return data;
}

async function fetchFromAPI(){
    let res = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=h4xYuoaDgHHU19yy6I3jDqjH7ZoPQ9ruXtNJ6buj&types=movie&genres=4&page=1&source_ids=203&regions=US`);
    let data = await res.json();
    return data; 
}

async function fetchFromAPIFromPageNumber(pageNumber){
    let res = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=h4xYuoaDgHHU19yy6I3jDqjH7ZoPQ9ruXtNJ6buj&types=movie&genres=4&page=${pageNumber}&source_ids=203&regions=US`);
    let data = await res.json();
    return data; 
}

async function fetchFromAPIByTitle(movieTitle){
    let res = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=h4xYuoaDgHHU19yy6I3jDqjH7ZoPQ9ruXtNJ6buj&types=movie&genres=4&page=${pageNumber}&source_ids=203&regions=US`);
    let data = await res.json();
    return data; 
}





export { AddUser, Login, GetUserByUsername, AddMWG, fetchFromAPI, fetchFromAPIFromPageNumber, GetAllUsers, AddMemberToMWG, GetAllCreatedMWGByUserId, GetAllMWGAUserIsMemberOfuserId, EditMWG, EditMWGName, DeleteMemberFromMWG, AddMovieToMWG}
