import React from 'react';
import { auth } from './firebase';


const Mainpage = () => {

	const logout = () => {
		auth.signOut();
	}

	return (
		<div style={{ marginTop: 250 }}>
			<center>
				<h3>Welcome{auth.currentUser.phoneNumber}</h3>
				<input type="sub" onClick={logout} value="Logout"/>
			
			</center>
		</div>
	);
}

export default Mainpage;
