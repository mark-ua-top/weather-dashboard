import React from 'react';
import '../../../dstyle.css';
import './signup.css';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const formik = useFormik({
        initialValues: { name: '', email: '' },
        onSubmit: values => {
            localStorage.setItem('user', JSON.stringify(values));
            toast.success('Signed up!');
        }
    });

    return (
        <section className="signup">
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
        </section>
    );
}
