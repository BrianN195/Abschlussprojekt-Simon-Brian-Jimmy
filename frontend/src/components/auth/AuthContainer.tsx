import GuestButton from "./GuestButton";
import LoginLogoutButton from "./LoginLogoutButton";
import RegisterButton from "./RegisterButton";  

function AuthContainer() {
    return ( 
        <div className="auth-container">
            <GuestButton />
            <LoginLogoutButton />
            <RegisterButton />
        </div>
    );
}

export default AuthContainer;