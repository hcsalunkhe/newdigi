import React from 'react'
import kyc from "../images/kyc.png";
import kart from "../images/kart.png";
import convertt from "../images/convert.png";
import part from "../images/part.png";
import safe from "../images/safe.png";
import vault from "../images/vault.png";
import certify from "../images/certify.ico";

const Mid = () => {
    return (
        <div>
            <div className="row no-gutters">
<div className="col-md-6 no-gutters">
    <div classname="leftside d-flex justify-content-center align-items-center p-5">
        <div className="hc p-5">
        <h1>   Why Digital Gold? </h1>

        <p>
        <img src={kart} width="80" height="70" alt="kart" />
        24K Pure Gold
        </p>
        <p>
        <img src={vault} width="50" height="50" alt="vault" />
        Stored in safe & secure Vaults
        </p>
        <p>
            <img src={certify} width="50" height="50" alt="certify" />
            Sourced form Certified Manufacturers
        </p>

        <p>
            <img src={convertt} width="60" height="60" alt="convert" />
            Covert to Physical Gold anytime
        </p>
        <p>
            <img src={safe} width="50" height="50" alt="safe" />
            Doorstep delivery & Pickup Options
        </p>
        <p>
            <img src={kyc} width="50" height="50" alt="kyc" />
            KYC compliance
        </p>
        <p>
            <img src={part} width="50" height="50" alt="part" />
            Buy in Partner stores
        </p>
    </div>
</div>

</div>
        </div>
        </div>
    )
}

export default Mid

