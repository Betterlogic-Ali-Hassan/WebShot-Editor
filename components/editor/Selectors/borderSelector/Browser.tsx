import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

const Browser = () => {
  return (
    <>
      <div className='space-y-2'>
        <div className='h-8 bg-secondary rounded flex items-center px-2 space-x-2 border border-gray-200'>
          <div className='flex space-x-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
          </div>
          <div className='flex-1 h-4 bg-light rounded' />
        </div>

        <div className='h-8 bg-secondary rounded flex items-center px-2 space-x-2 border border-gray-200'>
          <div className='flex space-x-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
          </div>
          <div className='flex-1 h-4 bg-light rounded' />
        </div>
      </div>

      <div className='space-y-2'>
        <Button
          className='text-sm text-white bg-black hover:bg-black/80 w-full'
          size='sm'
        >
          URL on top
        </Button>
        <Button
          className='text-sm text-white bg-black hover:bg-black/80 w-full'
          size='sm'
        >
          URL on bottom
        </Button>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center space-x-2'>
          <Checkbox id='include-url' defaultChecked />
          <Label htmlFor='include-url' className='text-sm'>
            Include URL
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox id='include-date' defaultChecked />
          <Label htmlFor='include-date' className='text-sm'>
            Include Date
          </Label>
        </div>
      </div>
    </>
  );
};

export default Browser;
