import React, {useEffect, useState}  from 'react'
import thapapic from "../images/thapa1.png";
import aboutpic from "../images/aboutpic.png";

import { useHistory } from "react-router-dom";

const About = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            
                          
                        </div>

                         <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{ userData.name}</h5>
                                
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                   <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                   
                                </ul>
                           </div>
                        </div>

                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>

                    </div>



                    <div className="row">
                        {/* left side url  */}
                        

                        {/* right side data toogle  */}

                     <div className="col-md-8 pl-5 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                               User Profile
                                            </div>
                                            
                                    
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                Name
                                            </div>
                                            <div className="col-md-6 ">
                                                <p>{ userData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                             Middle Name
                                            </div>
                                            <div className="col-md-6 ">
                                                <p>{ userData.mname}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                              Last Name
                                            </div>
                                            <div className="col-md-6 ">
                                                <p>{ userData.lname}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                Email
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                Phone
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData.phone}</p>
                                            </div>
                                        </div>
                                   </div>     
                            </div>
                          
                              
                            </div>
</div>


                </form>
           </div>
        </>
    )
}

export default About
