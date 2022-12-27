const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {

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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 4, message: body }]   // вместо пуша используется спред оператор
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;