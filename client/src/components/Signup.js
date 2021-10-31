import React, {useState}  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.svg";


const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", mname: "",lname: "", password: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user, [name]:value});
    }


    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone,lname,mname, password } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, lname,mname, password
            })
        });

        const data = await res.json();

        // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("INvalid Registration");
            console.log("INvalid Registration");
        } else {
             window.alert(" Registration Successfull");
            console.log("Successfull Registration");

            history.push("/login");
        }
    }


    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Complete Your Profile</h2>
                            <form method="POST" className="register-form" id="register-form">
                                
                                <div className="form-group">
                                    
                                    <input type="text" name="name" id="name" autocomplete="off"
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder="Your First Name"
                                    />
                                </div>
                                <div className="form-group">
                                   
                                    <input type="text" name="mname" id="mname" autoComplete="off"
                                        value={user.mname}
                                        onChange={handleInputs}
                                        placeholder="Your Middle Name"
                                    />
                                </div>

                                <div className="form-group">
                                   
                                    <input type="text" name="lname" id="lname" autoComplete="off"
                                        value={user.lname}
                                        onChange={handleInputs}
                                        placeholder="Your Last Name"
                                    />
                                </div>


                                 <div className="form-group">
                                   
                                    <input type="email" className="email" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Your Email"
                                    />
                                </div>

                                 <div className="form-group">
                                  
                                    <input type="number" name="phone" id="phone" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        placeholder="Your Phone"
                                    />
                                </div>

                               
                                 <div className="form-group">
                                  
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={user.password}
                                        onChange={handleInputs}
                                        placeholder="Your Password"
                                    />
                                </div>
                               
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                        value="Submit" onClick={PostData}
                                     
                                    />
                                </div>

                            </form>
                        </div>
                        
                            <div className="signup-image">
                                <figure>
                                    <img src={signpic} alt="registration pic" />
                                </figure>
                                <NavLink to="/login" className="signup-image-link">I am already register</NavLink>
                            </div>
                       
                    </div>
                </div>
           </section>
        </>
    )
}

export default Signup
