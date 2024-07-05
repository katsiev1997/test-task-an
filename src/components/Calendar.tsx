import Day from "./Day";

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const date = new Date();
  const days = Array.from(
    { length: daysInMonth(date.getFullYear(), date.getMonth()) },
    (_, i) => i + 1
  );

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <Day key={day} day={day} />
      ))}
    </div>
  );
};

export default Calendar;
