import React from 'react';
import Profile from './Profile';
import '../../Chat/ChatScreen.scss';

const ProfileList = ({ users, onClickUser }) => {
    console.log('users', users);
    return (
        <div>
            <ul className="list">
                {
                    Object.keys(users).map((key, id) => (
                        <li className="clearfix" onClick={()=> onClickUser(key)}>
                            <Profile profile={users[key]} key={key} onClickUser={onClickUser}/>
                        </li>

                    ))
                }

            </ul>
        </div>
    )
}

export default ProfileList