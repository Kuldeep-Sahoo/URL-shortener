"use client"
import { useState } from 'react'

const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const year = 2025;
const monthIndexMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

// FIX: Use SINGLE consistent format MM/DD/YYYY
const formatDate = (y, m, d) => `${m + 1}/${d}/${y}`;

const dummyDates = [
    "1/1/2025",
    "1/12/2025",
    "1/20/2025",
    "2/3/2025",
    "2/14/2025",
    "2/28/2025",
    "3/1/2025",
    "3/10/2025",
    "3/25/2025",
    "4/4/2025",
    "4/18/2025",
    "4/29/2025",
    "5/6/2025",
    "5/15/2025",
    "5/27/2025",
    "6/2/2025",
    "6/16/2025",
    "6/28/2025",
    "7/4/2025",
    "7/16/2025",
    "7/28/2025",
    "8/5/2025",
    "8/17/2025",
    "8/30/2025",
    "9/9/2025",
    "9/21/2025",
    "10/3/2025",
    "10/15/2025",
    "11/2/2025",
    "12/1/2025"
];

const events = [
    "New Year Meetup",
    "Team Presentation",
    "Holiday",
    "Client Meeting",
    "Valentine Celebration",
    "Project Deadline",
    "Exam",
    "Workshop",
    "Birthday Event",
    "Holiday",
    "College Fest",
    "Sports Day",
    "Interview",
    "Seminar",
    "Family Function",
    "Orientation",
    "Class Test",
    "Result Day",
    "Holiday",
    "Trip",
    "Internship Start",
    "Sibling Birthday",
    "Holiday",
    "Project Review",
    "Exam",
    "Market Visit",
    "Farewell",
    "Festival",
    "Trip",
    "Event Finale"
];

const eventMap = {};
dummyDates.forEach((d, i) => (eventMap[d] = events[i]));

const Page = () => {
    const [selectedDay, setSelectedDay] = useState("");

    return (
        <>
            <div className='flex flex-wrap gap-1 m-2 p-1 items-center'>
                {daysOfMonth.map((m, idx) => (
                    <div key={idx} className='h-[230px] w-[260px]'>
                        <Month
                            days={m}
                            name={months[idx]}
                            setSelectedDay={setSelectedDay}
                        />
                    </div>
                ))}
                <h1 className='text-6xl'>{selectedDay}</h1>
            </div>
        </>
    );
};

const Month = ({ days, name, setSelectedDay }) => {

    const getDateStr = (name, day) => {
        const monthIndex = monthIndexMap[name];
        return formatDate(year, monthIndex, day);
    };

    const handleClick = (name, day) => {
        const dateStr = getDateStr(name, day);

        if (eventMap[dateStr]) {
            setSelectedDay(`${dateStr} - ${eventMap[dateStr]}`);
        } else {
            setSelectedDay(dateStr + " - No Event");
        }
    };

    return (
        <div>
            <h6>{name}</h6>
            <div className='flex flex-wrap'>
                {Array.from({ length: days }, (_, i) => {
                    const day = i + 1;
                    const dateStr = getDateStr(name, day);

                    return (
                        <p
                            key={`${name}-${day}`}
                            className={`m-0.5
                                ${dummyDates.includes(dateStr)
                                    ? "bg-red-600"
                                    : "bg-yellow-500"}
                                h-8 w-8 cursor-pointer rounded
                                text-center p-1 text-black`}
                            onClick={() => handleClick(name, day)}
                        >
                            {day}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default Page;
