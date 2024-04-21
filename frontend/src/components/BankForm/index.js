import React from "react"
import {useSelector, useDispatch} from 'react-redux';

import { editUser } from "../../store/sessionReducer";

const BankForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleBankFormSubmit = e => {
        dispatch(editUser('bank_id', true, user.id));
    }

    return (
    <div>
        <div>
            Enter a way for us to send you your earnings before you start selling!
        </div>
        <form onSubmit={handleBankFormSubmit}>
            <div>Account number</div>
            <div>Routing number</div>
            <button type='submit'>test send earnings</button>
        </form>
    </div>
    )
};

export default BankForm;
