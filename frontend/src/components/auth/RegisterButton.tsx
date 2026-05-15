import {Link} from "react-router-dom";

function RegisterButton() {
    return (
        <Link className="auth-button" to="/register">
            Registration
        </Link>
    );
}

export default RegisterButton;