import {Link} from "react-router-dom";

function RegisterButton() {
    return (
        <Link to="/register">
            <button className="register-button">Registration</button>
        </Link>
    );
}

export default RegisterButton;