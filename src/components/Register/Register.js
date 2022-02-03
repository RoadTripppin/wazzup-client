import { useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();

  return <div>console.log({searchParams.get("email")})</div>;
};

export default Register;
