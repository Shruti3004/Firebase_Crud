import React, { useState } from 'react'
import ContactForm from './ContactForm';
import firebaseDb from '../firebase';
import { useEffect } from 'react';

function Contact() {
    const [contactObjects, setContactObjects] = useState({});
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapShot => {
            if(snapShot.val() !== null){
                setContactObjects({
                    ...snapShot.val()
                })
            }else{
                setContactObjects({})
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if(currentId == ''){
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if(err)
                        console.log(err);
                    else
                    setCurrentId('');
                }
            )
        }else{
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err)
                        console.log(err);
                    else
                        setCurrentId('');
                }
            )
        }
    }

    const onDelete = (key) => {
        if(window.confirm('Are you sure you want to delete the record?')){
            firebaseDb.child(`contacts/${key}`).remove(                
                err => {
                    if(err)
                        console.log(err);
                    else
                        setCurrentId('');
                }
            )
        }
    }

    return (        
        <>
            <div>
                <div className="alert-secondary my-5">
                    <h1 className="display-4 text-center py-3">
                        Contact Register
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 col-lg-5 col-sm-12 col-12">
                    <ContactForm {...({addOrEdit, contactObjects, currentId })}/>
                </div>
                <div className="col-md-7 col-lg-7 col-sm-12 col-12">
                    <table className="table table-bordered table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center font-weight-bold">Full Name</th>
                                <th className="text-center font-weight-bold">Mobile</th>
                                <th className="text-center font-weight-bold">Email</th>
                                <th className="text-center font-weight-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr key={id}>
                                        <td className="text-center">{contactObjects[id].firstName}</td>
                                        <td className="text-center">{contactObjects[id].mobile}</td>
                                        <td className="text-center">{contactObjects[id].email}</td>
                                        <td className="text-center">
                                            <a className="btn text-success" onClick={() => {setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Contact
