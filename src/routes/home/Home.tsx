import './home.scss'
import logoNT from "../../img/LOGO_NT.svg"
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/api/auth-api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

type FieldType = {
  login: string;
  password: string;
  remember?: string;
};



const Home: React.FC = () => {
    const [loginUser, ] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        
    
        
    
        try {
            const response = await loginUser({
              login: values.login,
              password: values.password,
            }).unwrap();
            
            dispatch({ type: "auth/login", payload: response });
            
            const notify = () => toast.success("Login muvaffaqiyatli");
            notify()
            setTimeout( () => {navigate("/dashboard");}, 2000 )
          } catch (error) {
            const notify = () => toast.error("Xatolik yuz berdi");
            notify()
          }
    
    
          console.log('Success:', values);
        };
        
      
    
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


  return (
    <div className="home">
        <div className='homeMain bg-[white] sm:p-[80px] relative'>
            <img className='w-[200px] absolute top-[60px]' src={logoNT} alt="" />
            <div className="form__wrapper w-[300px] sm:w-[400px] py-[30px]">
                <h1 className='text-[32px] font-semibold'>Tizimga kirish</h1>
                <Form
                    name="basic"
                    layout='vertical'
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<FieldType>
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Iltimos, loginni kiriting!' }]}
                    >
                    <Input className='border rounded-lg py-2 px-3' placeholder='Loginni kiriting'/>
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="Parol"
                    name="password"
                    rules={[{ required: true, message: 'Iltimos, parolni kiriting!' }]}
                    >
                    <Input.Password className='border rounded-lg py-2 px-3' placeholder='Parolni kiriting'/>
                    </Form.Item>
                    <br />
                    <button className='loginBtn'>Kirish</button>
                </Form>
            </div>
        </div>
        
        <ToastContainer />
    </div>
  )
}

export default Home