import {useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../../wrappers/AuthContext'

type Props = {
  userId: string | "";
}

const ProfilePictureButton = ({userId}: Props) => {
  const [ppActive, setPpActive] = useState<boolean>(false)
  const ppRef = useRef<HTMLDivElement>(null);
  const {logout} = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ppRef.current && !ppRef.current.contains(event.target as Node)) {
        setPpActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ppRef} className='relative'>
        <img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" alt="profile pic" className='w-10 rounded-2xl'
        onClick={() => setPpActive(ppa => !ppa)}/>

        {
            ppActive &&
            <div className='absolute p-3 z-30 top-12 w-32 right-0 bg-white border border-black rounded-lg flex flex-col items-stretch'>
                <NavLink to={`/profile/${userId}`} className='border-t text-center border-black hover:bg-slate-200 p-1'>See profile</NavLink>
                <button className='border-t border-black bg-red-200 hover:bg-red-300 p-1' onClick={logout}>logout</button>
            </div>
        }

    </div>
  )
}

export default ProfilePictureButton