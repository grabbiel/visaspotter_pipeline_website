import {useState, useEffect} from 'react';
import Select from 'react-select';
import './Select.css';

type SelectYearProps = {
    onYearChange: (year: string) => void;
    isFileProcessed: boolean;
    isFileProcessing: boolean;
};

function SelectYear({onYearChange, isFileProcessed, isFileProcessing}: SelectYearProps){

    const [selectedYear, setSelectedYear] = useState<string>('');
    const currentYear = new Date().getFullYear() - 1;
    const years = Array.from({ length: 3}, (_, i) => String(currentYear - i));

    const handleYearChange = (selectedOption: {value: string, label: string} | null) => {
        const year = selectedOption?.value ?? '';
        setSelectedYear(year);
        onYearChange(year);
    }

    useEffect(()=>{
        setSelectedYear('');
    },[isFileProcessed]);

    return(
        <div className='Select'>
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',}}
          >
            <label htmlFor="year-select">Select Year:</label>
            <Select
                id="year-select"
                value={{value: selectedYear, label: selectedYear ? selectedYear : '--Select Year--'}}
                options={years.map( year => ({value: year, label: year}) )}
                onChange={handleYearChange}
                isDisabled={isFileProcessing}
            />
          </div>
        </div>
    );
}

export default SelectYear;