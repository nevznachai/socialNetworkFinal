import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {

        profilePage: {
            posts: [
                { id: 1, message: 'oh, hi Mark', likesCount: 15 },
                { id: 2, message: 'is it instagram?', likesCount: 20 }
            ],
            newPostText: 'jopa'
        },


        dialogsPage: {

            dialogs: [
                { id: 1, name: 'Rodrigo' },
                { id: 2, name: 'Victorica' },
                { id: 3, name: 'Ignat' }
            ],

            messages: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'Who am i?' },
                { id: 3, message: 'whats going on?' }
            ],
            newMessageBody: ''
        },

        // sidebar: {
        //     friends: [
        //         { id: 1, name: 'Rodrigo' },
        //         { id: 2, name: 'Victorica' },
        //         { id: 3, name: 'Ignat' }
        //     ]
        // }

    },

    _callSubscriber() {
        console.log('State Changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    },

}

export default store;
