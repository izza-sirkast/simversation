import {useState} from 'react'
import { API } from '../../configs/api'
import { useAuth } from '../../wrappers/AuthContext'
import { useNavigate } from 'react-router'

// Types
import { Friend, User } from '../../../types'

type Props = {
    friends : Friend[],
    setOpenCreateNewGroup : (open : boolean) => void
}

const CreateGroupChat = ({ friends, setOpenCreateNewGroup }: Props) => {
  const [groupName, setGroupName] = useState<string>('')
  const [members, setMembers] = useState<any[]>([])
  const [searchUser, setSearchUser] = useState<string>('')
  const [openSearchResult, setOpenSearchResult] = useState<boolean>(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSearchUser = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value)
    if (e.target.value == '') {
        setOpenSearchResult(false)
        return
    }
    setOpenSearchResult(true)
  }

  const addMember = (user : User) => {
    setMembers([user, ...members])
    setSearchUser('')
    setOpenSearchResult(false)
  }

  const removeMember = (index : number) => {
    const newMembers = [...members]
    newMembers.splice(index, 1)
    setMembers(newMembers)
  }

  const createGroup = async () => {
    // Validate if group name is empty
    if (groupName == '') {
        alert('Group name cannot be empty')
        return
    }

    // Validate if group members is empty
    if (members.length == 0) {
        alert('Group members cannot be empty')
        return
    }

    let membersId = members.map(member => member.user_id)
    membersId.push(typeof user === 'object' && user !== null ? user.user_id : "")

    try {
        const { data } = await API.post('/group-chats/createGroupChat', {
            group_chat_name: groupName,
            members: membersId
        })
        console.log(data)
        alert('Group created successfully')
        setOpenCreateNewGroup(false)
        // reload the page
        navigate(-1);
    } catch (error) {
        console.log(error)
        alert('Failed to create group')
    }

  }

  return (
    <div className='min-h-full flex flex-col'>
        <div className='flex-1 p-2'>
            <h1 className='text-lg'>Create a New Group</h1>

            <p className='mt-2'>Group Name</p>
            <input
                className='border border-black px-2'
                type='text'
                placeholder='Group Name'
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />

            <div className='mt-2 relative'>
                <div>
                    <h1>Members</h1>
                    <input
                        className='border border-black px-2'
                        type='text'
                        placeholder='Search a user'
                        value={searchUser}
                        onChange={(e) => handleSearchUser(e)}
                    />
                    {
                        openSearchResult && (
                            <button 
                                className='text-red-500 underline ml-2 cursor-pointer'
                                onClick={() => setOpenSearchResult(false)}>Close</button>
                        )
                    }
                </div>

                {
                    openSearchResult && (
                        <div className='mt-2 border border-black p-2 bg-white absolute top-full w-full'>
                            {
                                friends.map((friend: Friend, index: number) => {
                                    if (friend.friend.username.toLowerCase().includes(searchUser.toLowerCase()) && !members.includes(friend.friend)) {
                                        return (
                                            <div key={friend.friend.user_id} className='flex items-center gap-2 border-b border-black p-2'>
                                                <p>{friend.friend.username}</p>
                                                <button 
                                                    className='border border-black bg-green-100 cursor-pointer hover:bg-green-200 px-2'
                                                    onClick={() => addMember(friend.friend)}>
                                                    Add
                                                </button>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                }

            </div>

            <div className='mt-2'>
                {
                    members.map((user: any, index: number) => (
                        <div key={index} className='mt-2 flex justify-between items-center gap-2 border-b border-black p-2'>
                            <p>Member {index + 1} : </p>
                            <p>Username : {user.username}</p>
                            <button 
                                className='border border-black bg-red-100 cursor-pointer hover:bg-red-200 px-2'
                                onClick={() => removeMember(index)}>
                                Remove
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className='mt-2 sticky flex justify-end bottom-0 p-2 border-t border-black bg-white'>
            <button 
                className='border border-black bg-red-100 cursor-pointer hover:bg-red-200 px-2'
                onClick={() => setOpenCreateNewGroup(false)}>
                Cancel
            </button>

            <button 
                className='border border-black bg-blue-100 cursor-pointer hover:bg-blue-200 px-2 ml-2'
                onClick={createGroup}>
                Create
            </button>
        </div>
    </div>
  )
}

export default CreateGroupChat