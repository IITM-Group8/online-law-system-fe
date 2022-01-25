import { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

import * as CommonConstants from '../Constants/CommonConstants.js'
import '../Styles/home.css';
import '../Styles/login.css';
import LawLogo from '../Images/law_logo3.jpg';
import UserIcon from '../Images/User-Icon.png';

const customStyle = {
    content: {
        backgroundColor: '',
        border: ''
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            Name: '',
            Email: '',
            Password: '',
            Mobile: '',
            Age: '',
            Address: '',
            City: '',
            Pincode: '',
            Expertize: '',
            isSignInFormOpen: false,
            isSignUpFormOpen: false,
            expertizeId: 'expertizeHide',
            userDetails: undefined,
            errorMessage: '',
            successMessage: '',
            userToken: '',
            toRedirect: false
        }
    }

    render() {
        const { Name, Email, Password, Mobile, Age, Address, City, Pincode, Expertize, isSignInFormOpen, isSignUpFormOpen, expertizeId, userDetails, errorMessage, successMessage, userToken, toRedirect} = this.state;
        return (
            <>
                <div class="container">
                    <div class="sign_container">
                        <span class="signspan" id="login" onClick={this.loginOpenHandler}>LOGIN</span>
                        <span class="signspan" id="signup" onClick={this.signUpOpenHandler}>SIGN UP</span>
                    </div>
                    <div class="logo">
                        <img src={LawLogo} alt='Not found'/>
                        <p>Online Law System</p>
                    </div>
                    <div class="options">
                        <span class="option_span" id="home">Home</span>
                        <span class="option_span" id="aboutus">About Us</span>
                    </div>
                </div>

                <Modal isOpen={isSignInFormOpen} style={customStyle} ariaHideApp={false}>
                    <div class="form-container" >
                        <div class="imgcontainer">
                            <img src={UserIcon} alt='Not found' class="user-icon" />
                            <h1>Login</h1>
                        </div>
                        <div class="login-container">
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <button type="submit" onClick={this.signInHandler} >Login</button>
                            {errorMessage && <div class="error-msg"> {errorMessage} </div>}
                        </div>
                        <div class="login-container">
                            <button type="button" class="cancelbtn" onClick={this.signInCancelHandler}>Cancel</button>
                            <span class="psw"><a href="#">Forgot Password?</a></span>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={toRedirect} ariaHideApp={false}>
                    <Navigate to={{
                        pathname: "/dashboard",
                        state: {
                            userDetails: userDetails
                        }
                    }} userDetails = {userDetails}/>
                </Modal>

                <Modal isOpen={isSignUpFormOpen} style={customStyle} ariaHideApp={false}>
                    <div class="form-container">
                        <div class="imgcontainer">
                            <img src={UserIcon} class="user-icon" alt='Not Found'/>
                            <h1>Sign Up</h1>
                        </div>
                        <div class="error-msg"> All Fields are Mandatory </div>
                        <form action="#" class="login-container">
                            <label><b>Name</b></label>
                            <input type="text" value={Name} placeholder="Enter Full Name" onChange={(event) => this.handleChange(event, 'Name')} required />
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <label><b>Mobile No.</b></label>
                            <input type="text" value={Mobile} placeholder="Enter Mobile No." onChange={(event) => this.handleChange(event, 'Mobile')} required />
                            <label><b>Role</b></label>
                            <select onChange={(event) => this.handleChangeForRole(event, 'Role')} required >
                                <option value="">Select Role</option>
                                <option value="Public">Public</option>
                                <option value="Lawyer">Lawyer</option>
                            </select>
                            <label><b>Age</b></label>
                            <input type="text" value={Age} placeholder="Enter Age" onChange={(event) => this.handleChange(event, 'Age')} required />
                            <label><b>Address</b></label>
                            <input type="text" value={Address} placeholder="Enter Full Address" onChange={(event) => this.handleChange(event, 'Address')} required />
                            <label><b>City</b></label>
                            <input type="text" value={City} placeholder="Enter City" onChange={(event) => this.handleChange(event, 'City')} required />
                            <label><b>Pincode</b></label>
                            <input type="text" value={Pincode} placeholder="Enter Pincode" onChange={(event) => this.handleChange(event, 'Pincode')} required />
                            <div id={expertizeId}>
                                <label><b>Expertize</b></label>
                                <input type="text" value={Expertize} placeholder="Enter Lawyer's Expertize" onChange={(event) => this.handleChange(event, 'Expertize')} required />
                            </div>
                            <button type="submit" onClick={this.signUpHandler}>Sign Up</button>
                            {errorMessage && <div class="error-msg"> {errorMessage} </div>}
                            {successMessage && <div class="success-msg"> {successMessage} </div>}
                        </form>
                        <div class="login-container">
                            <button type="button" class="cancelbtn" onClick={this.signUpCancelHandler}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: ''
        });
    }

    handleChangeForRole = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
        if (event.target.value === 'Lawyer') {
            this.setState({
                expertizeId: 'expertizeShow'
            });
        }
        if (event.target.value !== 'Lawyer') {
            this.setState({
                expertizeId: 'expertizeHide'
            });
        }
    }

    loginOpenHandler = () => {
        this.setState({
            isSignInFormOpen: true
        });
    }

    signUpOpenHandler = () => {
        this.setState({
            isSignUpFormOpen: true
        })
    }

    signInCancelHandler = () => {
        this.setState({
            Email: '',
            Password: '',
            isSignInFormOpen: false,
            errorMessage: ''
        });
    }

    signUpCancelHandler = () => {
        this.setState({
            Name: '',
            Email: '',
            Password: '',
            Mobile: '',
            Role: '',
            Age: '',
            Address: '',
            City: '',
            Pincode: '',
            Expertize: '',
            isSignUpFormOpen: false,
            expertizeId: 'expertizeHide',
            successMessage: ''
        });
    }

    signInHandler = () => {
        console.log("signInHandler begins");
        const { Email, Password } = this.state;
        if (!Email || !Password) {
            console.log("User credentials are missing");
            this.setState({
                errorMessage: 'Invalid Credentials'
            });
            return;
        }
        const request = {
            email: Email,
            password: Password
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.LOGIN_USER;
        console.log("Login User url : ", url);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const userData = result.data;
            const uDet = userData.userDetails;
            this.setState({
                userToken: userData.token,
                userDetails: uDet
            });
            if (userData.statusCode !== 200) {
                var errMsg = 'Login Failed';
                if (userData.message != null) {
                    errMsg = userData.message;
                }
                this.setState({
                    errorMessage: errMsg
                });
            } else {
                this.setState({
                    errorMessage: '',
                    email: '',
                    password: '',
                    toRedirect: true
                });

                console.log("navigating to dashboard");
                this.signInCancelHandler();
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Login Failed. Please check your credentials. ';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg
            });
        });
    }

    signUpHandler = () => {
        console.log("signUpHandler begins");
        const { Name, Email, Password, Mobile, Role, Age, Address, City, Pincode, Expertize } = this.state;
        if (!Name || !Email || !Password || !Mobile || !Role || !Age || !Address || !City || !Pincode) {
            console.log("Mandatory fields are missing");
            this.setState({
                errorMessage: 'Mandatory fields are missing'
            });
            return;
        }
        const request = {
            email: Email,
            password: Password,
            name: Name,
            mobile_no: Mobile,
            role: Role,
            age: Age,
            address: Address,
            city: City,
            pincode: Pincode,
            expertize: Expertize
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.REGISTER_USER;
        console.log("Register User url : ", url);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            if (resultData.statusCode !== 201 && resultData.statusCode !== 200) {
                var errMsg = 'Registration Failed';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg
                });
            } else {
                this.setState({
                    errorMessage: '',
                    email: '',
                    password: '',
                    name: '',
                    mobile_no: '',
                    role: '',
                    age: '',
                    address: '',
                    city: '',
                    pincode: '',
                    expertize: '',
                    isSignUpFormOpen: true,
                    successMessage: 'User Registered successfully'
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Registration Failed. ';
            if (errData != null && errData.message != null) {
                console.log("errData in catch ", errData.message);
                errMsg = errData.message;
            }
            this.setState({
                errorMessage: errMsg
            });
        });
    }
}


export default Header;