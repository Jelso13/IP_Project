import Cookies from "universal-cookie";
import {navigate} from "gatsby";

const CookieChecker = () => {
    var cookies = new Cookies();
    var userHash = cookies.get("userHash");

    if(userHash !== undefined){
        navigate("/");
    }
    return null
}

export default CookieChecker