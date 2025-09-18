

function login() {
    const form=document.getElementById("login_form")
    form.addEventListener("submit", async(e)=>{
        e.preventDefault()
        const email=document.getElementById("email").value
        const password=document.getElementById("password").value
        try{
            fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            }).then((response)=>{
                if(response.ok){
                console.log("Login successfully")
                return response.json()

                } else{
                console.error("Login failed")
                }
            }).then((data)=>{
                console.log(data)
                localStorage.setItem("accessToken",data.accessToken)
            }).catch((err)=>{
                console.error('error;',err)
            })
        }
        catch(e){
            console.log(e)
        }
    })
}

async function getAdmins() {
    let accessToken=localStorage.getItem("accessToken")


    const accessTokenExpTime=getTokenExpTime(accessToken)
    console.log("accessTokenExpTime:",accessTokenExpTime)
    if(accessTokenExpTime){
        const currentTime= new Date()
        if(currentTime<accessTokenExpTime){
            console.log("AccessToken faol")
        }else{
            console.log("Access token vaqti chiqib ketdi")
            accessToken = await refreshToken();
        }
    }
    else{
        console.log('AccessToken chiqish vaqti berilmagan')
    }

    fetch("http://localhost:5000/api/admin",{
        method:"GET",
        headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json"
        }
    }).then((response)=>{
        if(response.ok){
            return response.json()
        }else{
            console.log("Request failed with status:",response.status)
        }
    }).then((adminData)=>{
        console.log(adminData),
        displayAdmins(adminData.data)
    }).catch((error)=>{
        console.log("Error:",error)
    })


    
}
function displayAdmins(adminData){
        const adminList=document.getElementById("list_of_admins")
        adminData.forEach((admin)=>{
            const listItem=document.createElement("li");
            listItem.textContent=`${admin.full_name} - ${admin.email}`
            adminList.appendChild(listItem)
        })
    }

function getTokenExpTime(token){
        const decodedToken=JSON.parse(atob(token.split(".")[1]))
        if(decodedToken.exp){
            return new Date(decodedToken.exp*1000)
        }
        return null
    }
async function refreshToken() {
    const loginUrl="/login"
    try {
        const response= await fetch("http://localhost:5000/api/auth/refresh", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await response.json()

        if (data.error && data.error=="jwt expired") {
            console.log("Refresh token time is exired");
            return window.location.replace(loginUrl)
        }
        console.log("Tokenlar refresh token yordamida yangilandi");
        localStorage.setItem("accessToken",data.accessToken)
        return data.accessToken;
    } catch (error) {
        console.log(error);
        
    }
}
