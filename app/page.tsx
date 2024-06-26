"use client";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";

import CurrentWeather from "@/components/CurrentWeather";
import Weather from "@/components/Weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([
    "New York",
    "London",
    "Tokyo",
  ]);

  const fetchWeather = (e: FormEvent) => {
    e.preventDefault();
    let newCity = city.toLocaleLowerCase();
    if (!cities.includes(newCity)) {
      setCities([...cities, newCity]);
    }
    setCity("");
  };

  const deleteCity = (name: string) => {
    // Delete if city is noy added correctly
  };

  return (
    <div>
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80"
        alt="img"
        layout="fill"
        className="object-cover"
      />

      {/* Search */}
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
        >
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
              type="text"
              placeholder="Search city"
            />
          </div>
          <button onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>

      <div className="overflow-y-scroll max-h-[90vh]">
        {/* Weather */}
        {<CurrentWeather />}
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          {cities.map((name) => (
            <div key={name}>
              <Weather name={name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
