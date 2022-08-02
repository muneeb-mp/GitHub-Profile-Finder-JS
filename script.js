const url = "https://api.github.com/users/";
const inputBox = document.getElementById("inputBox");
const searchBtn = document.getElementById("searchBtn");
const profileBox = document.getElementById("profile-box");
const loading = document.getElementById("loading");


const displayProfile = (profile) => {
    return `
            <div class="profile-container">
                    <div class="avatar-container">
                    <div class="left">
                        <div class="avatar">
                            <img src=${profile.avatar_url} alt="Avatar">
                        </div>
                        <div class="self-info">
                            <h2 id="name">${profile.name}</h2>
                            <h2 id="username">${profile.login}</h2>
                        </div>
                    </div>
                    <a href="${profile.html_url}" target="_blank">
                        <button class="primaryBtn" src>Check Profile</button>
                    </a>
                </div>

                <div class="about">
                    <h2>About</h2>
                    <p>${profile.bio}</p>
                </div>

                <div class="info">
                    <div class="info-item">
                        <h2>Followers</h2>
                        <p>${profile.followers}</p>
                    </div>
                    <div class="info-item">
                        <h2>Following</h2>
                        <p>${profile.following}</p>
                    </div>
                    <div class="info-item">
                        <h2>Repository</h2>
                        <p>${profile.public_repos}</p>
                    </div>
                </div>
            </div>
        `; 
};


const fetchProfile = async () => {
    const usernameInput = inputBox.value;
    loading.innerText = "Loading....";

    try{
        const res = await fetch(`${url}${usernameInput}`);
        const data = await res.json();
        // console.log(data);

        if(data.bio) {
            loading.innerText = "";
            profileBox.innerHTML = displayProfile(data);
        }
        else {
            loading.innerHTML = `<h3 style="color:red; font-weight:400; font-size:1.6rem">Username not found</h3>`;
            profileBox.innerText = "";
        }
    }
    catch(error) {
        console.log({error});
        loading.innerText = "";
    }
}

searchBtn.addEventListener("click", fetchProfile);