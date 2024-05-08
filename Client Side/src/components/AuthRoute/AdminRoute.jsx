import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminOnly from '../Messages/NotAuthorised/NotAuthorised';
import { getUserProfileAction } from '../../redux/slice/users/usersSlice';

const AdminRoute = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    const { userAuth } = useSelector((state) => state?.users);
    const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;


    // Get login user form localStorage
    // const user = JSON.parse(localStorage.getItem('userInfo'));
    // const isAdmin = user?.userFound?.isAdmin ? true : false;

    if (!isAdmin) return <AdminOnly />;
    // if (!isAdmin) return <h1>Access Denied</h1>;
    return (
        <div>
            {children}
        </div>
    )
}

export default AdminRoute;















// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfileAction } from '../../redux/slices/users/usersSlice';
// import AdminOnly from '../Messages/NotAuthorised/NotAuthorised';

// const AdminRoute = ({ children }) => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getUserProfileAction());
//     }, [dispatch]);

//     const { userAuth } = useSelector((state) => state?.users);
//     // const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;


//     // Get login user form localStorage
//     const user = JSON.parse(localStorage.getItem('userInfo'));
//     const isAdmin = user?.userFound?.isAdmin ? true : false;

//     if (!isAdmin) return <AdminOnly />;
//     // if (!isAdmin) return <h1>Access Denied</h1>;
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }

// export default AdminRoute;

