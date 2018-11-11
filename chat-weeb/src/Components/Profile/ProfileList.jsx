import React from 'react';
import Profile from './Profile';
import '../../Chat/ChatScreen.scss';
import _ from 'lodash';

const ProfileList = ({ users, onClickUser, presence, chats, id }) => {
    console.log('chats', chats);
    let messages = [];
    chats && Object.keys(chats).map((key) => {
        if (key.includes(id) && chats[key]) {
            let pchats = Object.keys(chats[key]);
            console.log(pchats);
            messages.push({id: key.replace(id, ''), timestamp: chats[key][pchats[pchats.length - 1]].timestamp});
            // console.log(chatFullId)
        }
    })
    console.log(users);
    console.log(messages);
    messages.sort((a,b) => a.timestamp < b.timestamp ? 1 : (a.timestamp > b.timestamp ? -1 : 0));
    console.log(messages);

    let profiles = [];
    if(users) {
        let usersList = _.clone(users);
        messages.forEach(profId => {
            let pid = profId.id;
            profiles[pid] = usersList[pid];
            // delete usersList[pid];
        });
        console.log(usersList)
        // users = profiles;
        Object.keys(usersList).map((user) => {
            profiles[user] = usersList[user];
        })
        console.log(profiles)
    }
    
    let onlineList = [];
    Object.keys(presence).map((id) => {
        onlineList.push(id);
    })
    console.log('onlinelist', onlineList)

    return (
        <div>
            {profiles ?
            <ul className="list">
                {
                    Object.keys(profiles).map((key, id) => (

                        <li className="clearfix" onClick={() => onClickUser(key)}>
                            <Profile
                                profile={profiles[key]}
                                key={key}
                                online={onlineList.includes(key)}
                            />
                        </li>

                    ))
                }

            </ul>
            : <div>sorting</div>}
        </div>
    )
}

export default ProfileList