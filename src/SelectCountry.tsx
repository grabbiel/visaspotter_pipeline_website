import {useState, useEffect} from 'react';
import Select from 'react-select';
import './Select.css';


type SelectCountryProps = {
    onCountryChange: (year: string) => void;
    isFileProcessed: boolean;
    isFileProcessing: boolean;
};

function SelectCountry({onCountryChange, isFileProcessed, isFileProcessing}: SelectCountryProps){

    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleCountryChange = (selectedOption: {value: string, label: string} | null) => {
        const country = selectedOption?.value ?? '';
        setSelectedCountry(country);
        onCountryChange(country);
    }

    useEffect(()=>{
        setSelectedCountry('');
    },[isFileProcessed]);

    const countries = [
        { value: 'United States', label: 'United States' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'New Zealand', label: 'New Zealand' },
    ];    

    return(
        <div className='Select'>
          <div
            style={{display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center',}}
          >
            <label htmlFor="country-select">Select Country:</label>
            <Select
                id="year-select"
                value={{value: selectedCountry, label: selectedCountry ? selectedCountry : '--Select Country--'}}
                options={countries}
                onChange={handleCountryChange}
                isDisabled={isFileProcessing}
            />
          </div>
        </div>
    );
}

export default SelectCountry;