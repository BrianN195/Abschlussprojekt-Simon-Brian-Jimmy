import GuestButton from "./GuestButton";
import LoginLogoutButton from "./LoginLogoutButton";
import RegisterButton from "./RegisterButton";  

function AuthContainer() {
    return ( 
        <div className="auth-container">
            <GuestButton />

            <RegisterButton />
            
            <LoginLogoutButton />
            
        </div>
    );
}

export default AuthContainer;