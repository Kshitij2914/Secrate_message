import { HiOutlineLogout } from "react-icons/hi";
import { FaUserSecret } from "react-icons/fa";
import './Header.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  
  const navigate = useNavigate()
  function logout() {
    axios.get('https://secrate-message.vercel.app/logout')
      .then(result => {
        navigate('/Login')
        console.log(result)
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <div className='header'>
        <h4>Secrate message <FaUserSecret /></h4>
        <span id="icon" onClick={logout}><b>logout <HiOutlineLogout /></b> </span>
      </div>
    </div>

  )
}

export default Header
