import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import Login from './Login';
import Browse from './Browse';

const Body = () => {
    const dispatch = useDispatch();
   // const navigate = useNavigate(); // Ensure `useNavigate` is used in a React Router context

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
               // navigate("/browse"); // Navigate to /browse
            } else {
                dispatch(removeUser());
               // navigate("/"); // Navigate to /
            }
        });
    }, [dispatch]); // Add dependencies to useEffect

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
