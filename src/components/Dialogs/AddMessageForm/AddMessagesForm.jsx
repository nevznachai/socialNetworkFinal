import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../Common/FormsControls/FormsControls";


const AddMessageForm = (props) => {

    const maxLength50 = maxLengthCreator(50);

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'} validate={[required, maxLength50]} placeholder={'Enter your message'} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm ({ form: 'dialogAddMessageForm' })(AddMessageForm);