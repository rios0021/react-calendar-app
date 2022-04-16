import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import {Calendar,momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { uiOpenModal } from '../../actions/ui';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/event';
import { DeleteEventFab } from '../ui/DeleteEventFab';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) 

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState( localStorage.getItem('lastView' || 'month') );
    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector( state => state.calendar );
    const {uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const onSelectSlot = (e) => {
        dispatch(eventClearActive());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        // let color = '#367CF7';
        // if(isSelected) color = '#2452a3';
        const style = {
            backgroundColor: (uid === event.user._id) ? '#347235' : '#465660',
            borderRadius:'0px',
            opacity: 0.8,
            display:'block',
            color: 'white'
        }

        return {style}
    }
    return (
        <div className='calendar-screen'>
            <Navbar/>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={ lastView || 'month' }
            components={{
                event: CalendarEvent
            }}
            />
            <CalendarModal />
            <AddNewFab />
            {
                (activeEvent) &&
                <DeleteEventFab/>
            }
        </div>
    )
}