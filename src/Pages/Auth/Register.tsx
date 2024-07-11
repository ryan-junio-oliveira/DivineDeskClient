import NavbarHome from "../../Components/Home/NavBarHome";
import RegisterForm from "../../Components/Login/RegisterForm";

function Register() {
  return (
    <>
      <NavbarHome/>
      <div className="h-100">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;