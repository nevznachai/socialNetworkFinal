import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import AddMessageForm from './AddMessageForm/AddMessagesForm';



const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map((m) => <Message message={m.message} key={m.id} />);


    let addNewMessage = (values) => {
     props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.message}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>

    )
}



export default Dialogs;