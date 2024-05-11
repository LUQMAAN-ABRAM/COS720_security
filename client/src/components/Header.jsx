import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {signOut} from '../redux/user/UserSlice' ;
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const {currentuser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesignout = async () => {
    try {
      await fetch('/backend/auth/signout');
      dispatch(signOut())
      navigate('/SignUp')
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold'>COS720_Auth</h1>
        </Link>
        <ul className='flex gap-4'>
        <Link to='/Home'>
          <li>Home</li>
          </Link>
          <Link to='/About'>
          <li>About</li>
          </Link>
          <Link to='/SignUp'>
            {currentuser? (
              <img src={currentuser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />

            ): (
          <li>SignUp</li>
            )}
          </Link>
          <span onClick={handlesignout} className='text-red-700 cursor-pointer'>
          {currentuser? (<li>SignOut</li>):(<li></li>)}
          
        </span>

        </ul>
      </div>
        
    </div>
  )
}
