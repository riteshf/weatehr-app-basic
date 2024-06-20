import { getWeatherByNameOrCode } from "@/api/weather.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

type Props = {
  name: string;
};
const Weather = ({ name }: Props) => {
  const [weather, setWeather] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      getWeatherByNameOrCode(name).then((wthr) => {
        if (wthr) setWeather(wthr);
        setLoading(false);
      });
    });
  }, []);

  if (loading || !weather) return <Spinner />;

  return (
    <div className="relative flex flex-col justify-between max-w-[500px] w-full m-auto p-4 text-gray-300 z-10">
      <div className="bg-black/50 relative p-8 rounded-md">
        <div className="relative flex justify-between pt-12">
          <div className="flex flex-col items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather?.at(0)?.icon}@2x.png`}
              alt="/"
              width="100"
              height="100"
            />
            <p className="text-2xl">{weather.weather?.at(0)?.main}</p>
          </div>

          <div>
            <div className="flex justify-between">
              <p className="text-2xl text-center pb-6">{weather.name}</p>
              <p className="text-3xl">{weather.main?.temp?.toFixed(0)}&#176;</p>
            </div>
            <div className="flex justify-between text-center gap-4">
              <div>
                <p className="font-bold text-2xl">
                  {weather.main?.feels_like?.toFixed(0)}&#176;
                </p>
                <p className="text-xl">Feels Like</p>
              </div>
              <div>
                <p className="font-bold text-2xl">{weather.main?.humidity}%</p>
                <p className="text-xl">Humidity</p>
              </div>
              <div>
                <p className="font-bold text-2xl">
                  {weather.wind?.speed?.toFixed(0)} MPH
                </p>
                <p className="text-xl">Winds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom */}
    </div>
  );
};

export default Weather;
