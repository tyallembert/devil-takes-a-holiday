import "../../styles/hero.scss";
import { TopText, BottomText, DevilEyesOpen, DevilDrawing } from "../../components/SVGs";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getHours } from "../../utils/queries";

const Hero = () => {
    const [hours, setHours] = useState([]);
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
        checkAnimationCookie();
    }, [])

    const checkAnimationCookie = () => {
        const cookies = new Cookies();
        const animatedCookie = cookies.get('hasAnimated');
        animatedCookie ? setHasAnimated(true): setHasAnimated(false);
        setTimeout(() => {
            cookies.set('hasAnimated', true, { path: '/', expires: new Date(Date.now()+(1000 * 60 * 10))});
        }, 1000)
    }

    // Used to get the open hours
    useEffect(() => {
        getHours().then((data) => {
            if(!data) {
                console.log(data.error)
            }else {
                formatHours(data.value)
            }
        });
    }, []);

    const formatHours = (data) => {
        // Map to hold unique time ranges and their associated days
        const timeGroups = {};
      
        // Iterate through the data and group by time range
        data.forEach(({ day, open, close }) => {
            const timeRange = open && close && open.toLowerCase() !== "closed" && close.toLowerCase() !== "closed"
            ? `${open} - ${close}`
            : "Closed";
          if (!timeGroups[timeRange]) {
            timeGroups[timeRange] = [];
          }
          timeGroups[timeRange].push(day);
        });
      
        // Convert grouped data into formatted strings
        const formattedHours = Object.entries(timeGroups).map(([timeRange, days]) => {
          // Combine the days into a single string, e.g., "Monday - Thursday"
          const dayString = combineDays(days);
          return `${dayString}, ${timeRange}`;
        });
        setHours(formattedHours);
    };
    // Helper function to combine consecutive days
    const combineDays = (days) => {
        const dayOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        ];
    
        const sortedDays = days.sort(
        (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
        );
    
        let result = [];
        let tempGroup = [sortedDays[0]];
    
        for (let i = 1; i < sortedDays.length; i++) {
        const prevIndex = dayOrder.indexOf(sortedDays[i - 1]);
        const currentIndex = dayOrder.indexOf(sortedDays[i]);
    
        if (currentIndex - prevIndex === 1) {
            // Consecutive days
            tempGroup.push(sortedDays[i]);
        } else {
            // Break in sequence
            result.push(formatDayGroup(tempGroup));
            tempGroup = [sortedDays[i]];
        }
        }
    
        // Push the last group
        result.push(formatDayGroup(tempGroup));
    
        return result.join(", ");
    };
    
    // Helper function to format a group of consecutive days
    const formatDayGroup = (group) => {
        if (group.length === 1) {
        return group[0];
        }
        return `${group[0]} - ${group[group.length - 1]}`;
    };
    return (
        <section className="heroContainer">
            <TopText hasAnimated={hasAnimated}/>
            {
                hasAnimated ? (
                    <DevilDrawing />
                ): (
                    <DevilEyesOpen />
                )
            }
            <BottomText hasAnimated={hasAnimated}/>
            <div className={`timeContainer ${!hasAnimated ? 'fadeAnimation': ''}`}>
                {
                    hours.map((day, index) => (
                        <p key={index} className="time">{day}</p>
                    ))
                }
            </div>
        </section>
    )
}

export default Hero