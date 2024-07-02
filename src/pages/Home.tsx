import { NavLink } from 'react-router-dom';
import image from '../assets/image/thumb.png'


const Home = () => {

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-slate-700  w-full"
      style={{ backgroundImage: `url(${image})`}}
    >
      <div className='  w-3/4 flex justify-center p-12 bg-zinc-800 '>
        <h1 className="text-4xl font-bold text-white text-center">Welcome to Smart Phone Management Dashboard Please <span className='mx-2 text-sky-500'><NavLink to="/login">Login</NavLink></span>!</h1>
      </div>
    </div>
  );
};

export default Home;
