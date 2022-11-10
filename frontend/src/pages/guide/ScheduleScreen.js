import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from '../../components/datetime/DatePicker';
import DateTimePicker from '../../components/datetime/DateTimePicker';
import WeekDayAvailabilityEdit from '../../components/datetime/WeekdayAvailabilityEdit';
import DateAvailabilityEdit from '../../components/datetime/DateAvailabilityEdit';
import { AVAILABLE_TIMES } from '../../common/mockdata';

const ScheduleScreen = (props) => {
  const { account } = props;
  const navigate = useNavigate();
  const [periodType, setPeriodType] = useState('days');
  const [periodDays, setPeriodDays] = useState(90);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(7, 'd'));
  const [selectedDate, setSelectedDate] = useState(moment());
  const [pickerType, setPickerType] = useState('');
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
  const [availabilities, setAvailabilities] = useState(AVAILABLE_TIMES);
  const [overrides, setOverrides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(account).length === 0) {
      navigate('/login');
    }
  }, [account, navigate]);

  const onChangePeriodType = (e) => {
    setPeriodType(e.currentTarget.value);
  }

  const onChangePeriodDays = (e) => {
    setPeriodDays(e.target.value);
  }

  const onClickStartDate = () => {
    setSelectedDate(startDate);
    setDatePickerModal(true);
    setPickerType('start');
  }

  const onClickEndDate = () => {
    setSelectedDate(endDate);
    setDatePickerModal(true);
    setPickerType('end');
  }

  const onChangeDate = (date) => {
    if (pickerType === 'start') {
      setStartDate(date);
    } if (pickerType === 'end') {
      setEndDate(date);
    }
    setDatePickerModal(false);
  }

  const onAddWeekdayTime = (index) => {
    const newData = availabilities.map((availability, idx) => {
      if (index === idx) {
        return {
          ...availability,
          times: availability.times ? [...availability.times, { start: '', end: '' }] : [{ start: '', end: '' }],
        }
      }
      return availability;
    });
    setAvailabilities(newData);
  }

  const onRemoveWeekdayTime = (index, timeIndex) => {
    const newData = availabilities.map((availability, idx) => {
      if (index === idx) {
        return {
          ...availability,
          times: availability.times.filter((_, timeIdx) => timeIdx !== timeIndex),
        }
      }
      return availability;
    });
    setAvailabilities(newData);
  }

  const onClickOverride = () => {
    setDateTimePickerModal(true);
  }

  const onAddOverride = (override) => {
    setOverrides([...overrides, override]);
  }

  const onAddOverrideTime = (index) => {
    const newOverrides = overrides.map((override, idx) => {
      if (index === idx) {
        return {
          ...override,
          times: [...override.times, { start: '', end: '' }],
        }
      }
      return override;
    });
    setOverrides(newOverrides);
  }

  const onRemoveOverrideTime = (index, timeIndex) => {
    const newOverrides = overrides.map((override, idx) => {
      if (index === idx) {
        return {
          ...override,
          times: override.times.filter((_, timeIdx) => timeIdx !== timeIndex),
        }
      }
      return override;
    });
    setOverrides(newOverrides.filter(override => override.times.length > 0));
  }

  const onSaveChanges = () => {
    setLoading(true);
    // save time schedule
    setLoading(false);
  }

  return (
    <div className="px-8 sm:px-12 py-8">
      <h1 className="font-['Bold'] text-[2.75rem] text-white text-center">When Can People Book my Tour?</h1>
      <div className="flex flex-col max-w-[70.8rem] mt-8 mx-auto">
        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:gap-0 md:justify-between">
          <div className="flex flex-col">
            <h2 className="font-['Bold'] text-[1.875rem] text-white">Date Range</h2>
            <p className="text-[1.875rem] text-white">Students can schedule...</p>
            <fieldset className="flex flex-col gap-1">
              <div>
                <input
                  type="radio"
                  id="days"
                  name="periodType"
                  className="form-radio"
                  value="days"
                  checked={periodType === 'days'}
                  onChange={onChangePeriodType}
                  disabled={loading}
                />
                <label
                  htmlFor="days"
                  className="text-[1.5rem] text-white"
                >
                  <input
                    type="number"
                    className="bg-white text-[1.3rem] leading-[2.5rem] text-[#212529] rounded-[.5rem] appearance-none focus:outline-none w-[4rem] px-2 mr-2"
                    value={periodDays}
                    onChange={onChangePeriodDays}
                    disabled={loading}
                  />
                  calendar days in the future
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="range"
                  name="periodType"
                  value="range"
                  checked={periodType === 'range'}
                  onChange={onChangePeriodType}
                  disabled={loading}
                />
                <label htmlFor="range" className="text-[1.5rem] text-white">
                  Date range: from
                  <input
                    type="text"
                    className="bg-white text-[1.3rem] leading-[2.5rem] text-[#212529] text-center rounded-[.5rem] appearance-none focus:outline-none cursor-pointer w-[8rem] px-2 mx-2"
                    value={startDate.format('MM/DD/YY')}
                    onClick={onClickStartDate}
                    readOnly={true}
                    disabled={loading}
                  />
                  to
                  <input
                    type="text"
                    className="bg-white text-[1.3rem] leading-[2.5rem] text-[#212529] text-center rounded-[.5rem] appearance-none focus:outline-none cursor-pointer w-[8rem] px-2 ml-2"
                    value={endDate.format('MM/DD/YY')}
                    onClick={onClickEndDate}
                    readOnly={true}
                    disabled={loading}
                  />
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="indefinite"
                  name="periodType"
                  value="indefinite"
                  checked={periodType === 'indefinite'}
                  onChange={onChangePeriodType}
                  disabled={loading}
                />
                <label htmlFor="indefinite" className="text-[1.5rem] text-white">Indefinitely into the future</label>
              </div>
            </fieldset>
          </div>
          <button
            type="button"
            className="bg-primary rounded-[.5rem] text-[1.25rem] text-white w-full md:w-auto px-12 py-2"
            onClick={onSaveChanges}
          >Save all changes</button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row 2xl:justify-center gap-12 mt-12">
        <div className="flex flex-col">
          <h2 className="font-['Bold'] text-[1.875rem] text-white">Set Available Times</h2>
          <p className="text-[1.875rem] text-white">Input your weekly availabilities</p>
          <div className="flex flex-col gap-7 mt-11">
            {availabilities && availabilities.map((availability, idx) => (
              <WeekDayAvailabilityEdit
                key={`${availabilities.title}-${idx}`}
                availability={availability}
                disabled={loading}
                onAddTime={() => onAddWeekdayTime(idx)}
                onRemoveTime={(timeIdx) => onRemoveWeekdayTime(idx, timeIdx)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-6 max-w-[34rem]">
          <div className="flex flex-col">
            <h2 className="font-['Bold'] text-[1.875rem] text-white">Add date overrides</h2>
            <p className="text-[1.875rem] text-white">Select dates when your availability changes from your weekly hours</p>
            <div className="flex flex-col gap-7 mt-6">
              {overrides && overrides.map((override, idx) => (
                <DateAvailabilityEdit
                  key={`override-${idx}`}
                  availability={override}
                  disabled={loading}
                  onAddTime={() => onAddOverrideTime(idx)}
                  onRemoveTime={(timeIdx) => onRemoveOverrideTime(idx, timeIdx)}
                />
              ))}
            </div>
            <button
              type="button"
              className="bg-primary rounded-[1.5rem] text-[1.25rem] text-white w-full py-2 mt-7"
              onClick={onClickOverride}
            >Add a date override</button>
          </div>
          <button
            type="button"
            className="bg-primary rounded-[.5rem] text-[1.25rem] text-white w-full md:w-auto px-12 py-2"
            onClick={onSaveChanges}
          >Save all changes</button>
        </div>
      </div>
      <DatePicker
        open={datePickerModal}
        onClose={() => setDatePickerModal(false)}
        year={2022}
        startMonth={10}
        endMonth={14}
        selectedDate={selectedDate}
        onChangeDate={onChangeDate}
      />
      <DateTimePicker
        open={dateTimePickerModal}
        onClose={() => setDateTimePickerModal(false)}
        year={2022}
        startMonth={10}
        endMonth={14}
        onChange={onAddOverride}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
