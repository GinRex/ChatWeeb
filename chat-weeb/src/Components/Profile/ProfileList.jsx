import React from 'react';
import Profile from './Profile';
import '../Chat/ChatScreen.scss';
import _ from 'lodash';

const ProfileList = ({ search, users, favoriteList, onClickUser, presence, chats, id }) => {
    let messages = [];
    // console.log(favoriteList)
    let onlineList = [];
    if (presence) {
        Object.keys(presence).map((id) => {
            onlineList.push(id);
        })
    }
    // console.log('onlinelist', onlineList)
    chats && Object.keys(chats).map((key) => {
        if (key.includes(id) && chats[key]) {
            let pchats = Object.keys(chats[key]);
            // console.log(pchats);
            messages.push({ id: key.replace(id, ''), timestamp: chats[key][pchats[pchats.length - 1]].timestamp });
            // console.log(chatFullId)
        }
    })
    messages.sort((a, b) => a.timestamp < b.timestamp ? 1 : (a.timestamp > b.timestamp ? -1 : 0));
    let profiles = [];
    if (users && onlineList !== []) {
        let usersList = _.clone(users);
        //push all the online favorite users that have chats in the list chronological
        messages.forEach(profId => {
            let pid = profId.id;
            if (onlineList.includes(pid) && favoriteList.includes(pid)) {
                profiles[pid] = usersList[pid];
                // delete usersList[pid];
            }
        });
        //next push all the online favorite users left that haven't chat yet
        Object.keys(usersList).map((user) => {
            // console.log(user)
            if (onlineList.includes(user) && favoriteList.includes(user)) {
                profiles[user] = usersList[user];
                // delete usersList[user];
            }
        })
        //repeat for non favorite
        messages.forEach(profId => {
            let pid = profId.id;
            profiles[pid] = usersList[pid];
            delete usersList[pid];
        });
        // console.log(usersList)
        // users = profiles;
        Object.keys(usersList).map((user) => {
            profiles[user] = usersList[user];
        })
        // console.log(profiles)
    }

    return (
        <div>
            {profiles ?
                <ul className="list container-fluid">
                    {
                        Object.keys(profiles).map((key, id) => (

                            <li className="clearfix" onClick={() => onClickUser(key)}>
                                <Profile
                                    profile={profiles[key]}
                                    key={key}
                                    search={search}
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