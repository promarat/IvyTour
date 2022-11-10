import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoSearchOutline } from 'react-icons/io5';
import { UniversityItem } from './UniversityItem';
import { setBookInfo } from '../../store/actions/bookActions';
import { MEMBERSHIP_FREE } from '../../common/common';
import { TOUR_GUIDE } from '../../common/mockdata';

const SearchScreen = (props) => {
  const { account, universities, setBookInfo } = props;
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (universities) {
      setFiltered(universities.slice(0, 3));
    }
  }, [universities]);

  const onSelectUniversity = (item) => {
    if (Object.keys(account).length === 0 || account?.membership === MEMBERSHIP_FREE) {
      setBookInfo({
        university: item,
        guide: TOUR_GUIDE,
      });
      navigate('/book');
    } else {
      setBookInfo({
        university: item,
        guide: null,
      });
      navigate('/selectguide');
    }
  }

  const onChangeUniversity = (e) => {
    onSelectUniversity(universities[e.target.value]);
  }

  return (
    <div className="mx-auto mt-[2rem]">
      <h1 className="font-['Bold'] text-[3rem] text-white text-center">Which College Do You Want to Tour?</h1>
      <div className="flex flex-col max-w-[800px] gap-4 mx-auto mt-4">
        <div className="relative">
          <select
            type="text"
            className="form-control text-[1.3rem] rounded-[1rem]"
            onChange={onChangeUniversity}
          >
            <option value="" hidden>Click to Search Universities</option>
            {universities.map((university, idx) => (
              <option key={`select-${idx}`} value={idx}>{university.title}</option>
            ))}
          </select>
          <IoSearchOutline className="absolute top-2 right-5 text-[2rem] text-primary" />
        </div>
        {filtered && filtered.map((item, idx) => (
          <UniversityItem
            key={`university-${idx}`}
            title={item.title}
            ranking={item.ranking}
            fee={item.fee ?? 0}
            undergraduate={item.undergraduate ?? 0}
            onClick={() => onSelectUniversity(item)}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    universities: state.universities,
  };
}
const mapDispatchToProps = { setBookInfo };
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
