import '../styles/login.css';
import React, { useState } from 'react';

export const Reg = ({ handleReg, usernameTaken }) => {

    const [formData, setFormData] = useState({ username: '', password: '', displayName: '', profilePic: null });

    const validateForm = async event => {
        event.preventDefault()
        var pswd = document.getElementById("password").value
        var confirmPassword = document.getElementById("confirmPassword").value
        if (pswd !== confirmPassword) {
            var spanError = document.getElementById("span-error")
            if (spanError) {
                spanError.remove()
            }
            var valPassword1 = document.getElementById("valPassword")
            var valPassword2 = document.createElement('div')
            valPassword2.innerHTML = '<h5 className="card-text topmargin" id="valPassword">Confirm password: <input type="password" id="confirmPassword" name="confirmPassword" pattern="[a-zA-Z0-9]{5,}" title="Please enter at least 5 alphanumeric characters." required></input></h5> <span id="span-error"><h6 className="input-error">Passwords do not match!</h6></span>'
            valPassword1.replaceWith(valPassword2)
            var passwordInput = document.getElementById("password")
            passwordInput.value = ""
        }
        else {
            const isUnique = await handleReg(formData); //add the new user to the users list
            if (!isUnique) {
                setFormData({ ...formData, "username": "" });
                alert("username is already taken!");
            }
            else {
                setFormData({ username: '', password: '', displayName: '', profilePic: '' });
                var valpswd = document.getElementById('confirmPassword');
                valpswd.value = "";
                const upload_imj = document.getElementById('upload_imj');
                upload_imj.value = "";
                const preview1 = document.getElementById('preview');
                preview1.style.display = "none"
                alert('Register Successful');
                window.location.href = "/";
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePictureInput = e => {
        const img = e.target.files[0];
        if (img && img.size > 1000000) {
            alert('img size exceeds the limit of 1MB');
            e.target.value = null;
          }
        else{
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const preview = document.getElementById('preview');
            setFormData({ ...formData, "profilePic": event.target.result });
            preview.src = event.target.result;
            preview.style.display = "block"
        };
        reader.readAsDataURL(img);
    }
    };

    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <form action="./" method="get" onSubmit={validateForm}>
                <div className="card border-dark" id="login">
                    <div className="card-header text-center">
                        <h5>register</h5>
                    </div>
                    <div className="card-body" id="reg-card-body">
                        <div id="content">
                            <h5 className="card-text topmargin">Username: <input type="text" name="username" pattern="[a-zA-Z0-9_]{3,}" value={formData.username} required onChange={handleChange}></input></h5>
                            <span className="input-description">Please enter at least 3 (a-z/A-Z/0-9/_) characters</span>
                            <h5 className="card-text topmargin">Password: <input type="password" id="password" name="password" pattern="[a-zA-Z0-9]{5,}" value={formData.password} required onChange={handleChange}></input></h5>
                            <span className="input-description">Please enter at least 5 (a-z/A-Z/0-9) characters</span>
                            <h5 className="card-text topmargin" id="valPassword">Confirm password: <input type="password" id="confirmPassword" name="confirmPassword" pattern="[a-zA-Z0-9]{5,}" title="Please enter at least 5 alphanumeric characters." required></input></h5>
                            <h5 className="card-text topmargin">Display name: <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} required></input></h5>
                            <h5 className="card-text topmargin">Picture: <input type="file" accept="image/*" name="profilePic" id="upload_imj" onChange={handlePictureInput} required></input></h5> 
                            <img id="preview" src="#" alt="preview"></img>
                            <button type="submit" id="register" className="btn custom-btn topmargin">Register</button>
                        </div>
                        <div className="card-footer text-center text-body-secondary">
                            <span>
                                Already registered?
                                <a href="./"> Click here </a>
                                to login
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

}