import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import premiumPlan from 'public/assets/settings/premium-plan.svg';
import premiumPlanWhite from 'public/assets/settings/flash-white.svg';
import basicPlan from 'public/assets/settings/basic-plan.svg';
import basicPlanWhite from 'public/assets/settings/basic-plan_white.svg';
import enterprisePlan from 'public/assets/settings/enterprise-plan.svg';
import enterprisePlanWhite from 'public/assets/settings/enterprise-white.svg';
import Image from 'next/image';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Montserrat } from 'next/font/google';

const billings = [
  {
    id: 1,
    name: 'Monthly Billing',
    discounts: '',
  },
  {
    id: 2,
    name: 'Yearly Billing',
    discounts: '15%',
  },
];

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: '$0',
    yearlyPrice: '$0',
    icon: basicPlan,
    whiteIcon: basicPlanWhite,
    width: 16,
    height: 16,
    popular: false,
    benefits: [
      {
        id: 1,
        name: 'Access to 1 calendar',
      },
      {
        id: 2,
        name: 'Third-party app Integrations',
      },
      {
        id: 3,
        name: 'A co-admin access',
      },
      {
        id: 4,
        name: 'Feature evento have',
      },
    ],
  },
  {
    id: 2,
    name: 'Premium',
    price: '$10',
    yearlyPrice: '$102',
    originalPrice: '$120',
    icon: premiumPlan,
    whiteIcon: premiumPlanWhite,
    width: 20,
    height: 20,
    popular: true,
    benefits: [
      {
        id: 1,
        name: 'Access to 10 calendars',
      },
      {
        id: 2,
        name: 'More apps integration',
      },
      {
        id: 3,
        name: 'Unlimited co-admin access',
      },
      {
        id: 4,
        name: 'Feature evento have',
      },
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$20',
    yearlyPrice: '$170',
    originalPrice: '$200',
    icon: enterprisePlan,
    whiteIcon: enterprisePlanWhite,
    width: 16,
    height: 16,
    popular: false,
    benefits: [
      {
        id: 1,
        name: 'Unlimited calendar access',
      },
      {
        id: 2,
        name: 'More apps integration',
      },
      {
        id: 3,
        name: 'Unlimited co-admin access',
      },
      {
        id: 4,
        name: 'Feature evento have',
      },
    ],
  },
];

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

function Plans() {
  const [selectedPlan, setSelectedPlans] = useState('Monthly Billing');
  return (
    <div className={`flex flex-col gap-9`}>
      <div className={`space-y-2`}>
        <h3 className="text-Grey-G700 text-xl font-medium">Plans</h3>
        <div className="flex gap-1">
          <p className="text-Grey-G100 text-sm">
            Choose your preferred plan either monthly or go yearly to save more money.{' '}
            <span className="text-primary-100 text-sm cursor-pointer">View plan details</span>
          </p>
          {/* <div className="text-primary-100 text-sm cursor-pointer">View plan details</div> */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {billings.map((plan) => (
          <div key={plan.id} className="flex items-center gap-3 md:gap-5">
            <div
              className={`h-4 w-4 rounded-full border ${
                selectedPlan === plan.name ? 'border-primary-100' : 'border-Grey-G50'
              } bg-white-N0 cursor-pointer flex items-center justify-center`}
              onClick={() => setSelectedPlans(plan.name === selectedPlan ? '' : plan.name)}
            >
              {plan.name === selectedPlan && <div className="w-2 h-2 bg-primary-100 rounded-full"></div>}
            </div>
            <div className="flex gap-1">
              <p className="text-sm text-Grey-G600">{plan.name}</p>{' '}
              {plan.discounts && <span className="text-sm text-Success-S300">{plan.discounts} off</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden flex flex-col gap-9 mt-5">
        <h3 className="text-Grey-G700 text-xl font-medium">
          {selectedPlan === 'Monthly Billing' ? 'Monthly plans' : 'Yearly plans'}
        </h3>
        <div className="flex flex-col gap-8">
          {plans.map((plan) => (
            <div key={plan.id}>
              <div
                key={plan.id}
                className={`flex items-center justify-between ${
                  plan.id !== plans.length ? 'border-b border-b-Grey-G40 pb-8' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded border border-Grey-G30 ${
                      plan.name === 'Premium' ? 'bg-[#BB9BF2]' : ''
                    } ${plan.name === 'Basic' ? 'bg-[#F2BB9B]' : ''} ${
                      plan.name === 'Enterprise' ? 'bg-Errors-E75' : ''
                    } flex items-center justify-center`}
                  >
                    <Image src={plan.whiteIcon} alt="" width={20} height={20} />
                  </div>
                  <div>
                    <p className="text-Grey-600 font-medium">{plan.name}</p>
                    <p className={`text-Grey-G400 text-[0.625rem] space-x-2`}>
                      {plan.originalPrice && selectedPlan === 'Yearly Billing' && (
                        <span className="line-through">{plan.originalPrice}</span>
                      )}
                      <span className="et text-Success-S300">
                        {selectedPlan === 'Monthly Billing' ? plan.price : plan.yearlyPrice}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-sm text-primary-100 font-normal cursor-pointer">Get Plan</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-3 items-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
            }}
            className={`${
              plan.name === 'Basic'
                ? 'rounded-l-lg border-y border-y-Grey-G40 border-l border-l-Grey-G40 bg-Grey-G10'
                : ''
            } ${
              plan.name === 'Enterprise'
                ? 'rounded-r-lg border-y border-y-Grey-G40 border-r border-r-Grey-G40 bg-Grey-G10'
                : ''
            } ${plan.name === 'Premium' ? 'rounded-lg border border-Grey-G70 bg-Warnings-W50 pb-8' : 'pb-6'} px-4 pt-5`}
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <Image src={plan.icon} alt="" height={plan.height} width={plan.width} />
                <p className="text-Grey-G400 font-semibold text-base">{plan.name}</p>
              </div>
              <div
                className={`border-b ${plan.name === 'Premium' ? 'border-b-Grey-G50' : 'border-b-Grey-G30'} pb-3 -mt-2`}
              >
                <div className="flex gap-2 items-center">
                  <h3
                    className={`${montserrat.className} text-[2rem] ${
                      selectedPlan === 'Monthly Billing'
                        ? 'text-Grey-G300'
                        : plan.name !== 'Basic'
                          ? 'text-Success-S300'
                          : ''
                    } font-medium`}
                  >
                    {selectedPlan === 'Monthly Billing' ? plan.price : plan.yearlyPrice}
                  </h3>
                  <p className="text-Grey-G200 font-medium text-xs">
                    {selectedPlan === 'Monthly Billing' ? 'per month' : 'per year'}
                  </p>
                </div>
                {plan.popular && <p className="text-[#9E72ED] text-sm mt-3">Popular</p>}
              </div>
              <div className="space-y-5">
                {plan.benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center gap-2">
                    <FaRegCircleCheck size={16} color={plan.name === 'Premium' ? '#ED9E72' : '#3C3C3C'} />
                    <p className="text-Grey-G500 text-xs font-medium">{benefit.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Button
                  type="button"
                  title="plan-button"
                  styles={`w-full text-base font-bold border ${
                    plan.name === 'Premium' ? 'bg-primary-100 text-white-N0' : 'bg-white-N0'
                  } ${
                    plan.name === 'Basic'
                      ? 'border-secondary-100  text-secondary-100'
                      : 'border-primary-100 text-primary-100'
                  }`}
                >
                  {plan.name === 'Basic' ? 'Current Plan' : 'Get Plan'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
