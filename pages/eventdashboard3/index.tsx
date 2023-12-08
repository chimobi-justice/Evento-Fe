import NoEvent from '@/components/UserProfile/NoEvent';
import withAuth from '@/helpers/withAuth';
import withoutAuth from '@/helpers/withoutAuth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import calendarImage from '@/public/assets/profile/calendarForDashboard.svg';
import upcoming from '@/public/assets/eventDashboard3/upcoming.svg';
import created from '@/public/assets/eventDashboard3/created.svg';
import past from '@/public/assets/eventDashboard3/past.svg';
import { Montserrat, Nunito } from 'next/font/google';
import AuthLayout from '@/layout/Authlayout';
import { getUserEvents } from '@/http/dashBoard3api';
import { eventType } from '@/http/profileapi';
import { UserProfile } from '@/http/settingsapi';
import { useRouter } from 'next/router';
import CreateEvents from '../create-events';
import GridEventCard from '@/components/UserProfile/GridEventCard';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const Dashboard3: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [pastEvents, setPastEvents] = useState<eventType[]>([]);
  const [createdEvents, setCreatedEvent] = useState<eventType[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<eventType[]>([]);
  const combinedEvents = [...createdEvents, ...upcomingEvents];
  const router = useRouter();

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      const parsedUserProfile = JSON.parse(storedUserProfile);
      setUserProfile(parsedUserProfile);
    }
    getUserEvents(setPastEvents, setCreatedEvent, setUpcomingEvents);
  }, []);
  return (
    <AuthLayout>
      <div className={`px-20 mt-10 ${nunito.className} max-h-[100vh]`}>
        <section className="mb-14 ">
          <div className={`text-2xl font-medium mb-10 ${montserrat.className} `}>Welcome {userProfile.firstName},</div>
          <div className="upcomingRest flex justify-between">
            <div className="w-[360px] flex justify-between p-6 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]">
              <div className="flex flex-col justify-between">
                <span className={`text-[32px] leading-[40px] font-bold ${montserrat.className} `}>
                  {' '}
                  {upcomingEvents.length}
                </span>
                <span className="text-xl "> Upcoming events</span>
              </div>

              <Image src={upcoming} alt={''} />
            </div>
            <div className="w-[360px] flex justify-between p-6 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]">
              <div className="flex flex-col justify-between">
                <span className={`text-[32px] leading-[40px] font-bold ${montserrat.className} `}>
                  {' '}
                  {createdEvents.length}
                </span>
                <span className="text-xl "> Created events</span>
              </div>

              <Image src={created} alt={''} />
            </div>

            <div className="w-[360px] flex justify-between p-6 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]">
              <div className="flex flex-col justify-between">
                <span className={`text-[32px] leading-[40px] font-bold ${montserrat.className} `}>
                  {' '}
                  {pastEvents.length}
                </span>
                <span className="text-xl "> Past events</span>
              </div>

              <Image src={past} alt={''} />
            </div>
          </div>
        </section>
        <section className="flex justify-between">
          <div className="w-[850px] no-scrollbar overflow-y-auto max-h-[calc(100vh-300px)] flex flex-col ">
            {pastEvents.length < 0 && createdEvents.length < 0 && upcomingEvents.length < 0 ? (
              <NoEvent type={''} />
            ) : (
              <div className="w-full flex flex-col  gap-12">
                <div className="upcoming flex flex-col  gap-4">
                  {' '}
                  <div className="upcomingtitle flex justify-between items-baseline">
                    <span className="text-[#1E1E1E] text-xl font-semibold tracking-[-0.2px] ">Upcoming Events</span>{' '}
                    <span className="text-sm underline  font-bold text-[#767676]">View all</span>
                  </div>
                  {upcomingEvents.length > 0 || createdEvents.length > 0 ? (
                    <div className="grid-cols-2 grid gap-10 ">
                      {combinedEvents.map((event) => (
                        <GridEventCard key={0} event={event} />
                      ))}
                      {/* {pastEvents.map((event) => (
                        <GridEventCard key={0} event={event} />
                      ))} */}
                    </div>
                  ) : (
                    <div className="flex gap-y-1 flex-col h-[188px] justify-center items-center">
                      <h4
                        className={` ${montserrat.className} text-base lg:text-2xl max-w-[230px] md:max-w-none font-semibold  text-center`}
                      >
                        There’s nothing to show here.
                      </h4>

                      <p className="text-sm lg:text-base text-[#767676] max-w-[220px] md:max-w-none text-center">
                        <span
                          className="font-bold text-primary-100 cursor-pointer"
                          onClick={() => router.push('/create-events')}
                        >
                          create event
                        </span>{' '}
                        or{' '}
                        <span
                          className="font-bold text-primary-100 cursor-pointer"
                          onClick={() => router.push('/explore')}
                        >
                          explore event
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="past flex flex-col  gap-4">
                  {pastEvents.length < 0 && createdEvents.length < 0 && upcomingEvents.length < 0 ? (
                    <NoEvent type={''} />
                  ) : (
                    <div className="w-full flex flex-col  gap-4">
                      <div className="pasttitle flex justify-between items-baseline">
                        <span className="text-[#1E1E1E] text-xl font-semibold tracking-[-0.2px] ">Past Events</span>{' '}
                        <span className="text-sm underline  font-bold text-[#767676]">View all</span>
                      </div>

                      {pastEvents.length > 0 ? (
                        <div className="grid-cols-2 grid gap-10">
                          {pastEvents.map((event) => (
                            <GridEventCard key={0} event={event} />
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-y-1 flex-col h-[188px] justify-center items-center">
                          <h4
                            className={` ${montserrat.className} text-base lg:text-2xl max-w-[230px] md:max-w-none font-semibold  text-center`}
                          >
                            There’s nothing to show here.
                          </h4>

                          <p className="text-sm lg:text-base text-[#767676] max-w-[220px] md:max-w-none text-center">
                            <span
                              className="font-bold text-primary-100 cursor-pointer"
                              onClick={() => router.push('/create-events')}
                            >
                              create event
                            </span>{' '}
                            or{' '}
                            <span
                              className="font-bold text-primary-100 cursor-pointer"
                              onClick={() => router.push('/explore')}
                            >
                              explore event
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="">
            <Image className="w-[366px] h-[496px] object-cover" src={calendarImage} alt={''}></Image>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};

export default withAuth(Dashboard3);
