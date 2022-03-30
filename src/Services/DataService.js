async function Login(userData){
    let res= await fetch('http://localhost:5238/User/Login', {
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
    let res = await fetch('http://localhost:5238/User/GetUserByUsername/' + (username));
    let data = await res.json();
    return data;
}

async function AddMWG(newMWG, groupCreatorId){
    let res= await fetch('http://localhost:5238/MWG/AddMWG/' + (groupCreatorId), {
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
    let res = await fetch('http://localhost:5238/User/GetAllUsers');
    let data = await res.json();
    return data;
}

export { Login, GetUserByUsername, AddMWG, GetAllUsers };