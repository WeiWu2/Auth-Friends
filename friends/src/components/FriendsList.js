import React, {useState, useEffect} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
export default function FriendsList() {

    const [friends, setFriends] = useState([])
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        axiosWithAuth().get('/api/friends').then((res) => {
            console.log(res.data)
            setFriends(res.data);
            setIsLoading(true);
        }
        )
    }, [])
    return (
        <div>
            {isloading ? 
            friends.map((friend) => {
               return (
               <div key ={friend.id}> 
                {friend.id},  
                {friend.name}, 
                {friend.age},  
                {friend.email},  
              </div>
               )
            }) : <p>Loading friends...</p>
        }

        </div>
    )
}
