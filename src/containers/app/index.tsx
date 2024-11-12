import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  registerLocale("ru", ru);

  return (
    <>
      <DatePicker
        selected={startDate}
        onSelect={(date) => setStartDate(date as Date)}
        locale="ru"
        dateFormat="dd/MM/yyyy"
      />
      
    </>
  );
};
