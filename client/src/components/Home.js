import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from "./Modal";
import Mid from "./Mid";



const Home = () => {

    // Initializing all the state variables
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("gm");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
    const [buttonPop, setButtonPop] = useState(false);
    // Calling the api whenever the dependency changes
    const [userData, setUserData] = useState({});
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    const [formData, setfromData] = useState({
        isAgree: false,
        gold: "Grams",
        hidden: "true"
    })

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    };
    const history = useHistory();
    const [user, setUser] = useState({
        phone: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const po = (e) => {

        history.push("/loginn");
    }
    const PostData = async (e) => {
        e.preventDefault();

        const { phone } = user;

        const res = await fetch("/otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone
            })
        });

        const data = await res.json();

        // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("INvalid Otp");
            console.log("INvalid Otp");
        } else {
            window.alert(" Otp Successfull");
            console.log("Successfull Otp");

            history.push("/payment");
        }
    }
    const handleChange = event => {
        const target = event.target
        const name = target.name
        const value = target.value

        setfromData({
            ...formData,
            [name]: value
        })


    }
    useEffect(() => {
        //setOptions(Object.keys(info));
        convert();


    }, [])
    function convert() {
        var rate = 4851.69;
        setOutput(input / rate);
    }

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            // console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>




            <div className="conta emp-profile">

                <div className="row">

                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-linkq justify content center" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"> BUY </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-linkp justify content center" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">SELL</a>

                        </li>
                    </ul>
                    <div className="col-md-12">
                        <div className="profile-head">

                            <h5>  <p className="profile-rating mt-4 mb-1">Live Buy Price<span>₹ 4855.36 /gm </span>+ GST</p></h5>
                            <h5><p className="profile-rating mt-3 mb-3">Please Login to view Balance</p></h5>


                        </div>
                    </div>



                </div>



                <div className="row">


                    {/* right side data toogle  */}

                    <div className="col-md-12 pl-5 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                   
                                    <div className="col-md-12">
                                        <input type="number" onChange={(e) => setInput(e.target.value)}  placeholder="Amount(₹)" />

                                    </div>
                                </div>
                                <div className="row mt-2">
                                   <div className="col-md-12 ">
                                        <input type="number" value={output}  onClick={() => { convert() }} placeholder="Gold Weight(g)" />
                                       
                                    </div>
                                </div>


                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <input type="sub" id="proceed" name="proceed" onClick={po} value="PROCEED" />
                                        

                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                   

                                    <div className="col-md-12">
                                        <input type="number" onChange={(e) => setInput(e.target.value)} placeholder="Amount(₹)"/>

                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12 ">
                                        <input type="number" value={output}  onClick={() => { convert() }} placeholder="Gold Weight(g)" />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <input type="sub" id="proceed" name="proceed" onClick={po} value="PROCEED" />
                                      

                                  </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Mid>
            </Mid>
        </>
       
    )
}

export default Home
