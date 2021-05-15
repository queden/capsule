import React, {useState, ChangeEvent} from 'react';
import DatePicker from 'react-datepicker';

import Arweave from 'arweave';

const CapsuleForm = () => {
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<FileList | null>(null); 
  const [date, setDate] = useState<Date>(new Date()); 

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>)=> {
    e.preventDefault();
    setFiles((e.target as HTMLInputElement).files);    
  }
  return (
    <>
      <h1>
        Bury a Capsule
      </h1>
      <form>
        <div>
          <label htmlFor='title'>Title</label>
          <input 
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='files'>Choose Artifacts</label>
          <input
            type='file'
            id='files'
            name='files'
            onChange={(e) => onChangeFiles(e)}
            multiple
          />
        </div>
        <div>
          <label htmlFor='date'>Choose Date to Open Capsule</label>
          <DatePicker 
            selected={date}
            onChange={date => setDate(date)}
          />
        </div>
      </form>
    </>
  );
}

export default CapsuleForm;
