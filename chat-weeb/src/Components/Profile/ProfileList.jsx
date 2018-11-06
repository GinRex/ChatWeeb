import React from 'react';
import Profile from './Profile';
import '../../Chat/ChatScreen.scss';

const ProfileList = ({ users, onClickUser, presence }) => {
    console.log('users', users);
    let onlineList = [];
    Object.keys(presence).map((id) => {
        onlineList.push(id);
    })
    console.log('onlinelist', onlineList)

    return (
        <div>
            <ul className="list">
                {
                    Object.keys(users).map((key, id) => (

                        <li className="clearfix" onClick={() => onClickUser(key)}>
                            <Profile
                                profile={users[key]}
                                key={key}
                                online={onlineList.includes(key)}
                            />
                        </li>

                    ))
                }

            </ul>
        </div>
    )
}

export default ProfileList