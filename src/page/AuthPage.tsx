import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ForgetPassword from '../components/Auth/ForgotPassword';

const AuthPage = (props: { type: string }): JSX.Element => {
  return (
    <>
      <section className='max-h-full min-h-screen'>
        {props.type === 'login' && <Login />}
        {props.type === 'signup' && <Register />}
        {props.type === 'forgot' && <ForgetPassword />}
      </section>
    </>
  );
};

export default AuthPage;
