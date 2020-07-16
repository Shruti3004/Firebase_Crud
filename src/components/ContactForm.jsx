import React, { useState } from 'react'
import { useEffect } from 'react';

function ContactForm({addOrEdit, contactObjects, currentId}) {
    const initialFieldValues = {
        firstName: '',
        mobile: '',
        email: '',
        address: ''
    }
    const [values, setValues] = useState(initialFieldValues);

    useEffect(()=>{
        if(currentId ===''){
            setValues({
                ...initialFieldValues
            })
        }else{
            setValues({
                ...contactObjects[currentId]
            })
        }
    },[contactObjects, currentId])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addOrEdit(values);
    }
    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <div className="fas fa-user"></div>
                    </div>                    
                </div>
                <input type="text" className="form-control" placeholder="Full Name" name="firstName" 
                value={values.firstName}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <div className="fas fa-mobile-alt"></div>
                        </div>                    
                    </div>
                    <input type="text" className="form-control" placeholder="Mobile" name="mobile" 
                    value={values.mobile}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <div className="fas fa-envelope"></div>
                        </div>                    
                    </div>
                    <input type="envelope" className="form-control" placeholder="Email" name="email" 
                    value={values.email}
                    onChange={handleInputChange}
                    />
                </div>                
            </div>
            <div className="form-group">
                <textarea name="address" className="form-control" placeholder="Address" 
                    value={values.address}
                    onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <input type="submit" value={currentId=='' ? 'Save' : 'Update'} className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default ContactForm
         