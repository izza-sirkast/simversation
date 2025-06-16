import { useState, useEffect } from 'react'
import { API } from '../../configs/api'
import { useAuth } from '../../wrappers/AuthContext'

// Types
import { Friend, User } from '../../../types'

// Components
import Chat from './Chat'
import CreateGroupChat from './CreateGroupChat'
import GroupChat from './GroupChat'
import ProfilePictureButton from './ProfilePictureButton'

type Props = {}

const Home = (props: Props) => {
  const [searchUsername, setSearchUsername] = useState<string>('')
  const [usersFound, setUsersFound] = useState<User[]>([])
  const [searchResultOpen, setSearchResultOpen] = useState<boolean>(false)
  const [friends, setFriends] = useState<Friend[]>([])
  const [groups, setGroups] = useState<any[]>([])

  const [currentRoom, setCurrentRoom] = useState<string>('')
  const [roomType, setRoomType] = useState<'private' | 'group'>('private')
  const [currentPrivateChatUser, setCurrentPrivateChatUser] = useState<User | null>(null)

  const [isPrivateChat, setIsPrivateChat] = useState<boolean>(true)
  const [openCreateNewGroup, setOpenCreateNewGroup] = useState<boolean>(false)

  const {logout, user} = useAuth()
  
  useEffect(() => {
    // Friends = other users that the current user has private chat with
    const getFriends = async () => {
      try {
        const { data } = await API.get(`/private-chats/getFriends/${typeof user === 'object' && user !== null ? user.user_id : ""}`)
        setFriends(data.friends)
      } catch (error) {
        alert('Failed to get private chats')
      }
    }

    const getGroups = async () => {
      try {
        const { data } = await API.get(`/group-chats/getGroupChatsByUserId`)
        setGroups(data.groupChats)
      } catch (error) {
        alert('Failed to get groups')
      }
    }

    getFriends()
    getGroups()
  }, [])

  const findUser = async () => {
    try {
      const { data } = await API.get(`/users/by-username/${searchUsername}`)
      setUsersFound(data)
      setSearchResultOpen(true)
    } catch (error : any) {
      if(error.status == 404){
        setUsersFound([])
        setSearchResultOpen(true)
      }
      console.log(error)
    }
  }

  const openPrivateChat = async (other_user: User) => {
    try {
      const { data } = await API.post('/private-chats/getByUserId', {
        user_1_id: typeof user === 'object' && user !== null ? user.user_id : "",
        user_2_id: other_user.user_id
      })
      setCurrentRoom(data.private_chat_id)
      setRoomType('private')
      setCurrentPrivateChatUser(other_user)
      setSearchResultOpen(false)
    } catch (error) {
      console.log(error)
      alert('Failed to open private chat')
    }
  }

  const openGroupChat = async (group_chat_id: string) => {
    setCurrentPrivateChatUser(null)
    setRoomType('group')
    setCurrentRoom(group_chat_id)
  }

  const closeAndDeleteGroupChat = (groupChatId : string) => {
    setCurrentRoom('')
    setGroups(groups.filter(group => group.group_chat_id !== groupChatId))
  }

  const changeMenu = (menu : 'private' | 'group') => {
    if(menu === 'private'){
      setIsPrivateChat(true)
    } else if (menu === 'group'){
      setIsPrivateChat(false)
    }
  }

  return (
    <div className='grid grid-cols-2'>
      <div className='flex flex-col h-screen items-start p-2 border-r border-black'>
        <div className='flex justify-between items-center w-full'>
          <div>
            <input className='border border-black mr-2 px-2' type="text" placeholder='Search a user' value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)}/>
            <button onClick={findUser} className='bg-blue-100 border border-black px-2 cursor-pointer hover:bg-blue-200 inline'>find</button>

            {
              searchResultOpen && (
                <div className='absolute w-1/2 z-100 mt-2 p-2 bg-white border border-black'>
                  <button className='ml-2 text-red-600 underline' onClick={() => setSearchResultOpen(false)}>close</button>
                  <div className='bg-white border-t border-l border-r border-black mt-3 z-20'>
                  {
                    usersFound.length === 0 ? (
                      <p className=' text-red-600 underline border-b border-black p-2'>No user found</p> 
                    ) : (
                      searchResultOpen && usersFound.map((other_user) => (
                        <div key={other_user.user_id} className='flex justify-between items-center border-b border-black px-2'>
                          <p>username : {other_user.username}</p>
                          <button className='border border-black bg-blue-200 m-2' onClick={() => openPrivateChat(other_user)}>Message</button>
                        </div>
                      ))
                    )
                  }
                  </div>
                </div>
              )
            }
          </div>

          <ProfilePictureButton />

        </div>

        <div className='flex-1 mt-3 mb-3 border border-black w-full overflow-scroll'>
          <div className='sticky w-full top-0 bg-white border-b border-black z-10'>
            <button 
              className={`border-r border-black p-2 cursor-pointer hover:bg-blue-200 ${isPrivateChat && 'bg-blue-100'}`}
              onClick={() => changeMenu('private')}>
              Private Chats
            </button>

            <button 
              className={`border-r border-black p-2 cursor-pointer hover:bg-blue-200 ${!isPrivateChat && 'bg-blue-100'}`}
              onClick={() => changeMenu('group')}>
              Group Chats
            </button>
          </div>

          {isPrivateChat ? (
              <div className=''>
                {
                  friends?.map(friend => (
                      <div key={friend.private_chat_id} className='flex justify-between items-center border-b border-black px-2'>
                        <p>Username : {friend.friend.username}</p>
                        <button className='border border-black bg-blue-100 cursor-pointer hover:bg-blue-200 m-2 px-2' onClick={() => openPrivateChat(friend.friend)}>Message</button>
                      </div>
                    )
                  )
                }
              </div>
            ) : (
              <div className='flex flex-col h-full'>
                {
                  !openCreateNewGroup && (
                    <div className='p-2 border-b border-black'>
                      <button
                        className='border border-black bg-blue-100 cursor-pointer hover:bg-blue-200 px-2'
                        onClick={() => setOpenCreateNewGroup(true)}
                        >
                        Create a new group
                      </button>
                    </div>
                  )
                }

                {
                  openCreateNewGroup ? (
                    <CreateGroupChat friends={friends} setOpenCreateNewGroup={setOpenCreateNewGroup} />
                  ) : (
                    <div>
                      {
                        groups.map(group => (
                          <div key={group.group_chat_id} className='flex justify-between items-center border-b border-black px-2'>
                            <p>Group Name : {group.group_chat_name}</p>
                            <button 
                              className='border border-black bg-blue-100 cursor-pointer hover:bg-blue-200 m-2 px-2'
                              onClick={() => openGroupChat(group.group_chat_id)}>
                              Open
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            ) 
          }
        </div>

        <button className='bg-red-100 border border-black px-2 cursor-pointer hover:bg-red-200' onClick={logout}>log out</button>
      </div>

      {
        currentRoom != '' && (
          roomType === 'private' ? (
            <Chat room={currentRoom} other_user={currentPrivateChatUser} />
          ) : (
            <GroupChat room={currentRoom} closeAndDeleteGroupChat={closeAndDeleteGroupChat} />
          )
        )
      }
    </div>
  )
}

export default Home