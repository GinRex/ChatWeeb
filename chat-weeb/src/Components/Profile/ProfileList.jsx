import React from 'react';
import Profile from './Profile';
import '../../Chat/ChatScreen.scss';

const ProfileList = ({ users }) => {
    return (
        <div>
            <ul className="list">
                {
                    Object.keys(users).map((key, id) => (
                        <li className="clearfix">
                            <Profile profile={users[key]} />
                        </li>

                    ))
                }

            </ul>
        </div>
    )
}

export default ProfileList