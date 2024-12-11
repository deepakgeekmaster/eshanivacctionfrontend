"use client";
import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
const FavouriteSlider = () => {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]" style={{ backgroundImage: `url(/assets/beach.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Beach</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]" style={{ backgroundImage: `url(/assets/desert.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Desert</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]" style={{ backgroundImage: `url(/assets/farm.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Farm</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]" style={{ backgroundImage: `url(/assets/island.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Island</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]" style={{ backgroundImage: `url(/assets/lake.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Lake</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]">

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]">

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]">

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]">

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/5">  <div className="max-w-xs mx-auto">
                    <div className="relative bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden h-[200px]">

                        <div className="absolute bottom-4">
                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                        </div>
                    </div>
                </div>
                </CarouselItem>

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    );
};

export default FavouriteSlider;
