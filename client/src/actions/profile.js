import axios from 'axios';
import{setAlert} from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';


// Get current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        
    } catch (err) {
        dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText,status:err.response.status}
        });
    }
};

// Create or update Profile
export const createProfile = (formData, history, edit= false) => async dispatch =>{
    try {
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        // dispatch({
        //     type:GET_PROFILE,
        //     payload:res.data
        // });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success')); 
        if(!edit){
            history.push('/dashboard'); 
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg,'danger')));
        }
         dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText,status:err.response.status}
        });
    }
}
// export const createProfile = (profileData, history) => dispatch => {
//   axios
//     .post('/api/profile', profileData)
//     .then(res => history.push('/dashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };

// // Clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };
