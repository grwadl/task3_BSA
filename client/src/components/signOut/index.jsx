import {unsetLoginSession} from "../../services/authService";
import React, {useState} from 'react';
import './signOut.css';
import { updateUser,deleteUserRequest} from "../../services/domainRequest/userRequest";

export default function SignOut({isSignedIn, onSignOut}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [form, setForm] = useState({
        email: '',
        phone: '',
        lastName: '',
        firstName: '',
        password: ''
    });
    const onChangeForm = e => setForm({...form, [e.target.name]: e.target.value});
    const signOut = () => {
        unsetLoginSession();
        onSignOut();
    }
    const inputs = [{name: 'email'}, {name: 'phone'}, {name: 'password'}, {name: 'firstName'}, {name: 'lastName'}]
    const openModal = () => {
        setIsOpenModal(true);
    }
    const closeModal = () => {
        setIsOpenModal(false);
        setForm({
            email: '', phone: '', lastName: '', firstName: '', password: ''
        })
    }
    const submitForm = async () => {
        let dataToUpdate = {};
        for (let key in form) {
            if (form[key])
                dataToUpdate = {...dataToUpdate, [key]: form[key]}
        }
        closeModal();
        const id = JSON.parse(localStorage.getItem('user'));
        await updateUser(dataToUpdate,id);
        setIsOpenModal(false);
    }
    const deleteUser = async() =>{
        const id = JSON.parse(localStorage.getItem('user'));
        signOut();
        await deleteUserRequest(id);
    }
    if (isOpenModal) {
        return (
            <div className='modal__bg' onClick={closeModal}>
                <div className='modal__form' onClick={e => e.stopPropagation()}>
                    {inputs.map(input => <input className='input__userForm' key={input.name} type="text"
                                                name={input.name} placeholder={`${input.name}...`}
                                                onChange={onChangeForm}
                    />)}
                    <button onClick={submitForm} className='confirmButton'>Confirm</button>
                    <button onClick={deleteUser} className='deleteutton confirmButton'>Delete User</button>
                </div>
            </div>
        )
    }
    if (isSignedIn) {
        return (
            <div>
                <div onClick={openModal} className='change__user'>Change user</div>
                <div onClick={signOut} id="sign-out">Sign out</div>
            </div>
        )
    }

    return null;
}