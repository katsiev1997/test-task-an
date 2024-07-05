import axios from "axios";
import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";

interface DayProps {
  day: number;
}

const Day = ({ day }: DayProps) => {
  const [open, setOpen] = useState(false);
  const [isHoliday, setIsHoliday] = useState(false);
  useEffect(() => {
    const checkHoliday = async () => {
      try {
        const response = await axios.get(
          `https://isdayoff.ru/api/getdata?year=${new Date().getFullYear()}&month=${
            new Date().getMonth() + 1
          }&day=${day}`
        );
        setIsHoliday(response.data === "1");
      } catch (error) {
        console.error("Error checking holiday status:", error);
      }
    };
    checkHoliday();
  }, [day]);

  return (
    <div
      className={`border p-2 cursor-pointer hover:border-blue-500 ${
        isHoliday ? "bg-red-200" : ""
      }`}
      onClick={() => setOpen(true)}
    >
      {day}
      {open && <TaskModal day={day} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Day;
