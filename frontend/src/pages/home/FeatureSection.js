import React from 'react';
import FEATURE_ICON_1 from '../../assets/images/feature_icon_1.png';
import FEATURE_ICON_2 from '../../assets/images/feature_icon_2.png';
import FEATURE_ICON_3 from '../../assets/images/feature_icon_3.png';

const FEATURES = [
  { icon: FEATURE_ICON_1, title: 'Live Q&AA', description: 'Ask any questions to the current undergraduate students for your dream school throughout the tour - whenever you want.' },
  { icon: FEATURE_ICON_2, title: '360° Technology', description: 'The best way to see colleges is through our 360° technology. Look around the campus in a live 360° webinar-type tour-rooms.' },
  { icon: FEATURE_ICON_3, title: 'Interactive Control', description: 'The tour guide has full control of the tour. If you ask a them that you want to see a specific part of the campus, they’ll change it right away!' },
];

const FeatureSection = () => {
  const renderFeatureCard = (feature) => (
    <div className="bg-[#1b1c1e] rounded-[1.5rem] shadow-[0_4px_20px_5px_rgba(0,0,0,0.25)] sm:max-w-[344px] xl:w-[344px] px-[1.5rem] pt-[2rem] pb-[1.2rem]">
      <img src={feature.icon} alt="" className="w-[36px] sm:w-[54px]" />
      <h2 className="font-['Bold'] text-[1.5rem] text-[#889ce7] mt-[5rem]">{feature.title}</h2>
      <p className="text-[1.2rem] text-[#a6a6a6]">{feature.description}</p>
    </div>
  );

  const renderExplain = () => (
    <div className="md:mt-8">
      <h2 className="font-['Medium'] text-[2rem] text-white text-center md:text-left">Why you will <span className="font-['Bold'] italic">love</span><br className="sm:hidden md:inline" /> our free tours</h2>
      <div className="flex flex-col gap-[1rem] mt-[1rem] font-['Medium'] text-[1.2rem] text-[#a6a6a6] sm:mx-4 md:mx-0">
        <p>Any question answered in real-time. Overviews and visual tours of the most unique spots and programs on campus. Is it that hard to write your "why-college" essay afterward?</p>
        <p>"Doing research" and "having a collaborative culture" isn't what makes top universities different from each other. Find out exactly how they're different from students, not paid by universities to paint rosy pictures.</p>
        <p>​Figuring out whether to add a college to your list or not? Decide in an hour and don't regret it. Just do your research beforehand and we'll take care of the rest.</p>
      </div>
    </div>
  )

  return (
    <div className="relative border-2 border-[#808080] sm:mx-4 lg:mx-16 xl:mx-24 2xl:mx-[108px] z-[1]">
      <div className="absolute bg-[url('assets/images/feature_bg.png')] bg-no-repeat bg-center bg-cover w-full h-full z-[-2]" />
      <div className="absolute bg-[rgba(14,14,15,.9)] w-full h-full z-[-2]" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:flex xl:justify-center gap-4 lg:gap-8 2xl:gap-12 mt-[-2.5rem] mb-[3rem] px-2">
        <div className="my-auto">
          {renderFeatureCard(FEATURES[0])}
        </div>
        <div className="flex flex-col gap-4">
          {renderFeatureCard(FEATURES[1])}
          {renderFeatureCard(FEATURES[2])}
        </div>
        <div className="sm:col-span-2 md:col-span-1 my-auto md:max-w-[460px]">
          {renderExplain()}
        </div>
      </div>
    </div>
  );
}

export { FeatureSection };
