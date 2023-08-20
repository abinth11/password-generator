import PasswordGenerator from './components/PasswordGenerator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-700'>
      <PasswordGenerator/>
      <ToastContainer/>
    </div>
  );
}

export default App;
