



 //moving to services page based on explore click
goToServicePage = () => {
    window.location.assign( "./services.html"); 
   // console.log(users);
}


async function getUsersdata () {

    let url =  "../js/users.json"; // paath for users.json file 

    let response =  await fetch(url);// waiting for the response
    if(response.ok){
        let json =  await response.json();  // getting the json data
       // console.log(json);
       return json
    
    }else{
        console.log("There is an Error"  + response.statusText);
    }
}
// let isAdmin = false;
let isLoggedIn = false;

validateUserData = () => {
    let users  = getUsersdata().then(res => {
        console.log(res);
        //let user =  res[0];
       // console.log(typeof(user));
        const unameEl =  document.getElementById("uname").value;
        const pwdEl = document.getElementById("pwd").value;
        if(unameEl == null || pwd == null){
            alert("Invalid Credentials");
        }
        else{
            res.map((user) => {
                
              if(user.username == unameEl && user.password == pwdEl){
                isLoggedIn = true;
                if(user.username ==  "admin"){
                    localStorage.setItem("isAdmin",true);
                }
                localStorage.setItem("username",user.username);
                
                localStorage.setItem("isLoggedIn",true);
                sessionStorage.setItem("password",pwdEl);

                let nameEl = document.getElementById("name");
                console.log(nameEl);
                alert("logged In Successfully");
                window.location.assign("./home.html");
              }
            })
            if(!isLoggedIn){
                alert("Invalid Credentials");
            }
        }
    });
}
init = () => {
    if(localStorage.getItem("username") !=  null)
    document.getElementById("name").innerHTML = "Hi " +  localStorage.getItem("username") + " |";
    if(localStorage.getItem("isAdmin")){
        document.getElementById("services").style.display = "none";
        document.getElementById("booking").style.display = "none";
    }else{
       let reportsEl =  document.getElementById("reports");
       if(reportsEl != null)
       reportsEl.style.display = "none";
    }
    if(localStorage.getItem("isLoggedIn")){
       let loginEl =  document.getElementById("login");
       if(loginEl !=null)
       loginEl.style.display  = "none"
    }
    if(localStorage.getItem("child-service") != null){
       let servicedropdown =  document.getElementById("selectService");
       if(servicedropdown != null){
        let childser =  localStorage.getItem("child-service");
            if(childser == 'pms'){
                servicedropdown.value =  "preventive maintenance service";
            }
            if(childser == 'ccs'){
                servicedropdown.value =  "car care service";
            }
            if(childser == 'brs'){
                servicedropdown.value = "body repair service";
            }
       }
    }
}
init();

let logoutEl  = document.getElementById("logout");
if(logoutEl != null){
    logoutEl.addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.clear();
        alert("Logged out successfully");
        window.location.assign("./login.html");
    })
}


// openening services wrt to userclcik on services 

openServices = (service) => {
// let service =  "";
    if(service == "pms"){
       // service  = "PMS";
        window.location.assign("./preventive-maintenance-service.html");
    }
    if(service == "ccs"){
       // service =  "CCS";
        window.location.assign("./car-care-service.html");
    } 
    if(service ==  "brs"){
       // service =  "BRS";
        window.location.assign("./body-repair-service.html");
    }
   // localStorage.setItem("child-service", service);
}

//opening booking page when clciked on  child services pages 
goToBookingPage = (service) => {
    localStorage.setItem("child-service",service);
    window.location.assign("./booking.html");
}

goback = () => {
    history.back();
}

dateValidation = () => {

    let currentDate = new Date();
    let enteredDate =  (document.getElementById("appointmentDate").value).split("-");
    let sDate1= enteredDate[1] + " "+ enteredDate[2] +" "+enteredDate[0];
    let date1=new Date(sDate1);  
    console.log( date1 );
    if(date1 - currentDate < 0){
        //alert("Invalid date");
        let errorEl =  document.getElementById("errorMsg");
        if(errorEl !=null){
            errorEl.style.display = "block";
            errorEl.innerHTML =  "Inavlid date";
            errorEl.style.color = "red";

        }
    }else{
        document.getElementById("errorMsg").style.display =  "none";
    }
}

submitform = (form) => {
    // console.log(form);
    form.action = "./booking-success.html";
    return true;
}