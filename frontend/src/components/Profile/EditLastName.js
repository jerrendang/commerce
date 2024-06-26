import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { editUser } from "../../store/sessionReducer";
import './EditFirstName.css';

const EditLastName = () => {
    const [showLNInput, setShowLNInput] = useState(false);
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.session);

    const handleInput = (e) => {
        setLastName(e.target.value);
    }

    const handleEditUser = () => {
        dispatch(editUser('last_name', lastName, user.id))
            .then(() => setShowLNInput(false))
    }

    return (
        <div className='flex flex-row userField m-[.5em] items-center'>
            {/* field label */}
            <span className='pr-[.5em]'>Last Name:</span>

            {/* Input and name */}
            <span className='flex items-center'>
                <div className={`${showLNInput ? 'hidden' : ''} px-[.5em]`}>{user.last_name || 'No last name on record'}</div>
                <input id='LNInput' onChange={handleInput}
                    className={`${showLNInput ? '' : 'hidden'} bordered`}></input>
            </span>

            {/* Setting show input */}
            <span className='flex items-center px-[.25em]'>
                <label htmlFor='editLNButton' className='hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height='1em' className={`${showLNInput ? 'hidden' : ''}`}>
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                            fill='rgba(0,0,0,1)'
                        /></svg>
                    <span className={`${showLNInput ? '' : 'hidden'}`}>Cancel</span>
                </label>
                <button id='editLNButton' className='hidden' onClick={e => setShowLNInput(!showLNInput)}></button>
            </span>

            {/* Submit */}
            <span className='flex items-center'>
                <button className={`${showLNInput ? '' : 'hidden'} bordered px-[.25em]`}
                    onClick={e => handleEditUser()}>Save</button>
            </span>
        </div>
    )
};

export default EditLastName;
