import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CalendarComponent from './CalendarComponent';
import { CALENDAR_SELECTABLE_ALL } from '../../common/common';
import { EVENT_LIST } from '../../common/mockdata';

const DatePicker = (props) => {
  const { year, startMonth, endMonth, selectedDate, onChangeDate, open, onClose } = props;
  const eventList = EVENT_LIST;

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={false}
      closeOnOverlayClick={true}
      center={true}
      classNames={{ root: "z-100", modal: "rounded-[.5rem]" }}
    >
      <div className="modal-body min-h-[30rem]">
        <CalendarComponent
          year={year}
          startMonth={startMonth}
          endMonth={endMonth}
          selectedDate={selectedDate}
          selectable={CALENDAR_SELECTABLE_ALL}
          eventList={eventList}
          onChangeDate={onChangeDate}
        />
      </div>
    </Modal>
  )
}

export default DatePicker;
