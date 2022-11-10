import React, { useEffect, useState } from 'react';
import { Helpers } from '@api.stream/studio-kit';
import { AiOutlineCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import CollapseButton from '../../components/sidebar/CollapseButton';

const { useStudio } = Helpers.React;

const MOCK_CATEGORIES = [
  { id: 1, title: 'Group Name 1' },
  { id: 2, title: 'Group Name 2' },
  { id: 3, title: 'Group Name 3' },
  { id: 4, title: 'Group Name 4' },
];

const MOCK_DATA = [
  { id: "1", category: 1, title: "University 1", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "2", category: 1, title: "University 2", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "3", category: 1, title: "University 3", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "4", category: 2, title: "University 4", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "5", category: 2, title: "University 5", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "6", category: 2, title: "University 6", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "7", category: 2, title: "University 7", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "8", category: 3, title: "University 8", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "9", category: 3, title: "University 9", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "10", category: 3, title: "University 10", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "11", category: 4, title: "University 11", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "12", category: 4, title: "University 12", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
];

const VideoTree = (props) => {
  const { mapStatus, showMap, setShowMap, collapsed, toggleCollapsed } = props;
  const { studio, room, projectCommands } = useStudio();
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [currentVideo, setCurrentVideo] = useState('');
  const [time, setTime] = useState(0);

  // For use when connected to backend
  // const [videoOverlays, setVideoOverlays] = useState([]);

  useEffect(() => {
    return studio.subscribe((event, payload) => {
      if (event === "VideoTimeUpdate") {
        setTime(payload.time);
      }
    })
  }, [studio]);

  const toggleMap = () => {
    setShowMap(!showMap);
    room.sendData({ type: "MapStateChange", visible: !showMap, pos: { lat: 43, lng: 43 } });
  }

  const playVideo = (video) => {
    if (currentVideo !== video.id) {
      setCurrentVideo(video.id);
      projectCommands.addVideoOverlay2(video.id, {
        src: video.url,
        type: 'overlay',
      });
    } else {
      setCurrentVideo('');
      projectCommands.removeVideoOverlay2(video.id);
    }
  }

  const renderCategory = (category) => {
    const videos = MOCK_DATA.filter(video => video.category === category.id);
    return (
      <div key={`category-${category.id}`} className="flex flex-col">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setCurrentCategory(category.id)}
        >
          {currentCategory === category.id ? (
            <AiOutlineCaretDown className="text-[#8f8f8f]" />
          ) : (
            <AiOutlineCaretRight className="text-[#8f8f8f]" />
          )}
          <span className="font-['Bold'] text-[1.25rem]">{category.title}</span>
        </div>
        {currentCategory === category.id && videos && videos.map(video => (
          <div key={`video-${currentCategory}-${video.id}`} className="flex items-center gap-3">
            <span
              className={`text-[1.25rem] ${currentVideo === video.id ? "underline" : ""} cursor-pointer ml-12`}
              onClick={() => playVideo(video)}
            >
              {video.title}
            </span>
            {currentVideo === video.id && (
              <span className="text-[1rem] text-[#8f8f8f]">{time}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative bg-white w-full flex flex-col justify-between rounded-[.5rem] shadow-[0_4px_4px_4px_rgba(0,0,0,.25)] p-4">
      <div>
        <h1 className="font-['Medium'] text-[1.5rem] text-center">Switch Videos</h1>
        <ul className="mt-3">
          {MOCK_CATEGORIES.map(category => (
            renderCategory(category)
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="w-full bg-primary text-[1.25rem] text-white rounded-[.5rem] px-2 py-3"
        onClick={toggleMap}
        disabled={!mapStatus}
      >Launch Google Maps</button>
      <div className="absolute -right-[1.25rem] 2xl:hidden">
        <CollapseButton
          collapsed={collapsed}
          onClick={toggleCollapsed}
        />
      </div>
    </div>
  );
}

export default VideoTree;
