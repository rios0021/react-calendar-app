import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import moment from 'moment'; 
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../actions/event';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = moment().minutes(0).seconds(0).add(2, 'hours');
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {
    
    const [titleValid, setTitleValid] = useState( true );

    const {modalOpen, start:modalStart, end:modalEnd} = useSelector( state => state.ui );
    const {activeEvent} = useSelector( state => state.calendar );
    initEvent.start = modalStart;
    initEvent.end = modalEnd;
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);
    
    const {notes, title, start, end} = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }else{
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    
    const closeModal = () => {
        setFormValues(initEvent);
        dispatch(eventClearActive());
        dispatch(uiCloseModal());
    }
    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'End date must be greater than start date', 'error');
        }
        if(title.trim().length < 2){
            return setTitleValid(false);
        }

        // TODO : save in database
        setTitleValid(true);
        
        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }else{
            dispatch(eventStartAddNew(formValues));
        }
        closeModal();
    }
    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>{activeEvent ? 'Edit Event' : 'New Event'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Start time/date</label>
                    <DateTimePicker 
                        onChange={handleStartDateChange} 
                        value={start}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>End time/date</label>
                    <DateTimePicker 
                        onChange={handleEndDateChange} 
                        value={end}
                        className="form-control"
                        minDate={start}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and Notes</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Short description</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Aditional Info</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}