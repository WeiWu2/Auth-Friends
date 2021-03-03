import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
export default function FriendsList() {


    const initialForm = {
        name: '',
        age: '',
        email: ''
    }
  const [friends, setFriends] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialForm);
  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        setFriends(res.data);
        setIsLoading(true);
      });
  }, []);

  const submit = (() => {
        const newFriend = {
            ...formValues,
          id: (friends.length + 1)
      }
    axiosWithAuth()
    .post("/api/friends", newFriend)
    .then((res) => {
      setFriends(res.data);
      setIsLoading(true);
    });
  })

  const handleChanges = (e) => {
      setFormValues({...formValues,
        [e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(false);
      submit();
  }
  return (
    <div>
      {isloading ? (
        <div>
         
          {friends.map((friend) => {
            return (
              <div key={friend.id}>
                {friend.id},{friend.name},{friend.age},{friend.email},
              </div>
            );
          })}

          <form onSubmit={handleSubmit}>
              <div>
              <label>Name</label>
                <input name='name' value={formValues.name} type='text' onChange={handleChanges}></input>
                </div>
                <div>
              <label>Age</label>
                <input name='age' value={formValues.age} type='text' onChange={handleChanges}></input>
                </div>
                <div>
              <label>Email</label>
                <input name='email' value={formValues.email} type='email' onChange={handleChanges}></input>
                </div>
                <button>Add Friend</button>
          </form>
        </div>
      ) : (
        <p>Loading friends...</p>
      )}
    </div>
  );
}
