import HomeFooter from '@/components/Home/homefooter';
import Homenav from '@/components/Home/homenav';
import EventGrids from '@/components/components/event-grids/event-grids';
import EventSearch from '@/components/event-search/event-search';
import Button from '@/components/ui/NewButton';
import { Music } from 'iconsax-react';
import { Montserrat, Nunito } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import withoutAuth from '@/helpers/withoutAuth';
import { getUpcomingEvents } from '@/http/events';
import { CategoryProps, EventsProps } from '@/@types';
import { getCategories } from '@/http/createeventapi';
import { getStoredUserId } from '@/http/getToken';
import AuthenticatedHeader from '@/components/components/authenticatedheader';

import { IoFootballOutline } from 'react-icons/io5';
import { CiBasketball } from 'react-icons/ci';
import { FaVolleyballBall, FaTableTennis } from 'react-icons/fa';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import { TbPlayHandball, TbSwimming } from 'react-icons/tb';
import { MdOutlineSportsRugby, MdOutlineGolfCourse, MdSportsCricket, MdOutlineSportsTennis } from 'react-icons/md';
import { IoBicycle } from 'react-icons/io5';
import { RiSailboatFill } from 'react-icons/ri';
import { GrRun } from 'react-icons/gr';

export const catergoryIcon = [
  { name: 'Basketball', icon: <CiBasketball /> },
  { name: 'Table Tennis', icon: <FaTableTennis /> },
  { name: 'Volleyball', icon: <FaVolleyballBall /> },
  { name: 'Wrestling', icon: <GiBoxingGlove /> },
  { name: 'Cricket', icon: <MdSportsCricket /> },
  { name: 'Handball', icon: <TbPlayHandball /> },
  { name: 'Weightlifting', icon: <GiWeightLiftingUp /> },
  { name: 'Badminton', icon: <GrRun /> },
  { name: 'Taekwondo', icon: <GrRun /> },
  { name: 'Judo', icon: <GrRun /> },
  { name: 'Tennis', icon: <MdOutlineSportsTennis /> },
  { name: 'Swimming', icon: <TbSwimming /> },
  { name: 'Rugby', icon: <MdOutlineSportsRugby /> },
  { name: 'Cycling', icon: <IoBicycle /> },
  { name: 'Golf', icon: <MdOutlineGolfCourse /> },
  { name: 'Dambe', icon: <GrRun /> },
  { name: 'Canoeing', icon: <RiSailboatFill /> },
  { name: 'Football', icon: <IoFootballOutline /> },
  { name: 'Athletics', icon: <GrRun /> },
  { name: 'Boxing', icon: <GiBoxingGlove /> },
];

const getCategoryIcon = (categoryTitle: string) => {
  const category = catergoryIcon.find((cat) => cat.name === categoryTitle);
  return category ? category.icon : <GrRun />;
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [data, setData] = useState<{ isLoading: boolean; data: EventsProps[] }>({ isLoading: true, data: [] });

  useEffect(() => {
    categoryData();
    getUpcomingEvents(setData);
  }, []);

  const categoryData = async () => {
    const cats = await getCategories(setCategories);
    // let catsss: any[] = [];
    if (cats) {
      setCategories([{ name: 'All', categoryID: 'all' }, ...cats]);

      // cats.forEach((element: { name: any }) => {
      //   catsss.push(element.name);
      //   return;
      // });
    }
    // console.log(catsss);
  };

  const userId = getStoredUserId();

  return (
    <div>
      {userId ? <AuthenticatedHeader /> : <Homenav />}
      <div className="relative">
        <div className="relative bg-secondary-100 py-11 sm:py-[74px] px-6">
          <div className="max-w-[634px] lg:max-w-[1002px] mx-auto text-center">
            <svg
              className="hidden md:block z-40 absolute top-1/2 translate-y-1/3 lg:-translate-y-1/2 -left-4 lg:left-0 h-[62px] w-[130px] lg:h-[119px] lg:w-[189px]"
              xmlns="http://www.w3.org/2000/svg"
              width="189"
              height="119"
              viewBox="0 0 189 119"
              fill="none"
            >
              <path
                d="M-52.9011 60.2781C-26.645 44.2749 7.90156 31.0312 41.8126 36.8524C63.4839 40.5725 82.652 56.605 84.9051 74.2111C87.033 90.8387 80.4022 108.382 59.7678 115.04C49.0124 118.51 37.7107 117.781 30.9112 109.528C20.5232 96.9202 29.9211 76.9181 40.2736 66.3004C72.5816 33.1647 133.111 13.4939 185.198 21.0311"
                stroke="#E0580C"
                strokeWidth="3.04636"
                strokeLinecap="round"
              />
              <path
                d="M153.68 2C161.613 5.78834 179.384 14.8804 186.999 20.9417"
                stroke="#E0580C"
                strokeWidth="3.04636"
                strokeLinecap="round"
              />
              <path
                d="M187 20.9416C179.066 24.7299 161.296 33.8219 153.68 39.8833"
                stroke="#E0580C"
                strokeWidth="3.04636"
                strokeLinecap="round"
              />
            </svg>
            <h1
              className={`${montserrat.className} text-2xl sm:text-[2.5rem] lg:text-6xl font-semibold text-Grey-G900 mb-4 sm:mb-8`}
            >
              Finding Events Have <span className="text-primary-100">Never</span> been{' '}
              <span className="text-primary-100">Easier</span>
            </h1>
            <p className={`${nunito.className} max-w-[600px] lg:max-w-[800px] mx-auto text-lg`}>
              Embark on a journey of personalized event discovery with Evento&apos;s unique recommendation engine. As
              you scroll through the Explore Page, immerse yourself in a finely curated feed of events meticulously
              crafted to align seamlessly with your individual preferences, location, and favorite categories.
            </p>
            {/* <EventSearch /> */}
          </div>
        </div>
        <main className="max-w-[1240px] mx-auto px-4">
          <section className="py-10 sm:pt-16 sm:pb-20">
            <h4 className={`${montserrat.className} hidden sm:block text-3xl font-bold mb-7 text-Grey-G700`}>
              Category
            </h4>
            <div className="flex no-scrollbar flex-nowrap overflow-scroll md:flex-wrap md:justify-center md:p-2 gap-x-4 lg:gap-x-3 gap-y-4">
              {categories.map((item, index) => {
                return (
                  <Button
                    key={item.categoryID}
                    // icons set

                    // leftIcon={<Music color={selectedCategory === item.categoryID ? '#FFF' : '#3C3C3C'} />}

                    leftIcon={getCategoryIcon(item.name)}
                    intent={'secondary'}
                    size={'md'}
                    className={`${
                      nunito.className
                    } rounded-full py-2 text-sm shrink-0 border-primary-100 border font-bold ${
                      selectedCategory === item.categoryID ? 'bg-primary-100 text-white-100' : ''
                    }`}
                    onClick={() => setSelectedCategory(item.categoryID == 'all' ? '' : item.categoryID)}
                  >
                    {item.name}
                    {/* jknjefd */}
                  </Button>
                );
              })}
            </div>
          </section>
          <section>
            <EventGrids
              title="Popular Events"
              events={data.data.filter((item) => item.categoryCategoryID.includes(selectedCategory))}
              isLoading={data.isLoading}
            />
          </section>
          <section>
            <EventGrids title="Recommended for You" events={data.data} isLoading={data.isLoading} />
          </section>
        </main>
      </div>
      {!userId && <HomeFooter />}
    </div>
  );
}

export default Home;
