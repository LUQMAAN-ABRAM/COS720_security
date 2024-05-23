import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fetch('/backend/auth/signout');
      dispatch(signOut());
      navigate('/SignUp');
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
          {currentuser ? (
            <>
              <Link to='/Home'>
                <li>Home</li>
              </Link>
              {currentuser.username === 'admin' && (
                <Link to='/About'>
                  <li>About</li>
                </Link>
              )}
              <Link to='/Modules'>
                <li>Modules</li>
              </Link>
              <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
                <li>SignOut</li>
              </span>
              <Link to='/Profile'>
                <img src={currentuser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
              </Link>
            </>
          ) : (
            <Link to='/SignUp'>
              <li>SignUp</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
