import {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { API } from '../../configs/api'

type Props = {
}

const Profile = (props: Props) => {
  const [profileData, setProfileData] = useState<any>(null);
  const { userId } = useParams<{ userId: string }>()

  // Fetch user profile data using userId
  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const res = await API.get(`/users/profile/${userId}`);
            setProfileData(res.data);
        }catch(error) {
            console.error("Failed to fetch user profile:", error);
            alert("failed to fetch user profile");
        }
    }

    fetchUserProfile();
  }, []);

  return (
    <div>{JSON.stringify(profileData)}</div>
  )
}

export default Profile