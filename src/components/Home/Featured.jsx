"use client";

import React, { useEffect, useRef } from "react";
import CampaignCarousel from "./CampaignCarousel";

export default function FeaturedSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const targets = [
      {
        element: document.getElementById("projectsFunded"),
        count: 150,
        suffix: "+",
      },
      {
        element: document.getElementById("amountFunded"),
        count: 89000,
        suffix: "$",
      },
      {
        element: document.getElementById("Funders"),
        count: 1000,
        suffix: "+",
      },
    ];

    const maxCount = Math.max(...targets.map((target) => target.count));

    const animateCountUp = (target, duration) => {
      let currentCount = 0;
      const increment = Math.ceil(target.count / (duration / 10));

      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= target.count) {
          clearInterval(interval);
          currentCount = target.count;
          target.element.textContent = currentCount + target.suffix;
        } else {
          target.element.textContent = currentCount;
        }
      }, 10);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.forEach((target) => {
              animateCountUp(target, maxCount / 100);
            });
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen ">
      <div className="pt-12  sm:pt-20">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10">
              <span className="gradient-text2">Explore Featured Campaigns</span>
            </h2>
            <p className="mt-3 text-xl leading-7 text-gray-900 dark:text-gray-400 sm:mt-4">
              We are helpin a lot of people Achive there dreams, take a look and
              support Big Dreams.
            </p>
          </div>
        </div>
        {/* <div className=" pb-12 mt-10  sm:pb-16"> */}
        {/* <div className="relative">
            <div className="absolute inset-0 h-1/2 "></div>
            <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto" ref={sectionRef}>
                <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col p-6 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                    <dt
                      className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400"
                      id="item-1"
                    >
                      Projects Funded
                    </dt>
                    <dd
                      className="order-1 text-5xl font-extrabold leading-none text-[#4598dc] dark:text-indigo-100"
                      aria-describedby="item-1"
                      id="projectsFunded"
                    >
                      0
                    </dd>
                  </div>
                  <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Towards Creative Work
                    </dt>
                    <dd
                      className="order-1 text-5xl font-extrabold leading-none text-[#4598dc] dark:text-indigo-100"
                      id="amountFunded"
                    >
                      0
                    </dd>
                  </div>
                  <div className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Sponsors
                    </dt>
                    <dd
                      className="order-1 text-5xl font-extrabold leading-none text-[#4598dc] dark:text-indigo-100"
                      id="Funders"
                    >
                      0
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div> */}
        {/* </div> */}
        <div className="mx-16">
          <CampaignCarousel />
        </div>
      </div>
    </div>
  );
}
