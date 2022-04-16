import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const {uid,name} = getState().auth;
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            
            if(body.ok){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event));
            }else{
                return Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }

}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload:event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventStartUpdate = (event) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        try {
            if(event.user._id !== uid ){
                return Swal.fire('Not Authorized', 'This event belongs to another user!', 'error');
            }else{
                
                const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
                const body = await resp.json();
                if(body.ok){
                    dispatch(eventUpdate(event));
                } else {
                    return Swal.fire('Error', body.msg, 'error');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDelete = () => {
    return async(dispatch,getState) => {
        try {
            const event = getState().calendar.activeEvent;
            const {uid} = getState().auth;
            const id = event.id;
            
            if(uid !== event.user._id){
                return Swal.fire('Not Authorized', 'This event belongs to another user!', 'error');
            }

            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if(body.ok){
                dispatch(eventDelete());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const eventDelete = () => ({
    type: types.eventDelete,
});

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.events);
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({type: types.eventLogout});