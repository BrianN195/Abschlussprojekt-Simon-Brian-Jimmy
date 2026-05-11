import { Link } from "react-router-dom";

function GuestButton() {
    return (
        <Link to="/main">
            <button className="guest-button">Guest</button>
        </Link>
    );
}

export default GuestButton;