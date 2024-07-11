import NavbarHome from "../../Components/Home/NavBarHome";
import RegisterForm from "../../Components/Login/RegisterForm";

function Register() {
  return (
    <>
      <NavbarHome/>
      <div>
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;