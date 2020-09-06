import React,{useState} from 'react';
import axios from 'axios';


function ProfileAvatar() {
  const [file,setFile] = useState('');
  const [fileName,setFileName] = useState('Choose File');
  const [uploadedFile,setUploadedFile] = useState({});
  const [uploadPercent,setUploadPercent] = useState(0);
  const handleChange = (e) =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
  }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        try{
            const res = await axios.post('http://localhost:5002/upload',formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                // .loaded , .total params are there in ProgressEvent  
                onUploadProgress: ProgressEvent =>{
                    setUploadPercent(parseInt( Math.round( (ProgressEvent.loaded*100) / ProgressEvent.total ) ) )
                    // progress bar can be delayed 
                    //setTimeout ( () => { setUploadPercent(parseInt( Math.round( (ProgressEvent.loaded*100) / ProgressEvent.total ) ) ) }, 2000 ) 
                
                //clear Percentage
                setTimeout( () =>{setUploadPercent(0)}, 10000)
                
                }



            });
            //response data
            const {fileName, filePath} = res.data;
            //note that file is under UploadedFile State 
            setUploadedFile({fileName,filePath});
            //file Uploaded put in call Back  
            setTimeout( () => {alert(`File ${fileName} is Uploaded !`);} , 2000)
            
        
        
        }
        catch(err)
        {

            if(err.response.status === 500)
            console.log('Server Error !');
            else
            console.log(err.response.data.msg);

        }
    }

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <div className="customFile">
                    <input type="file" onChange={handleChange}/>
    <label>{fileName}</label>
                </div>




            <input type="submit" value="Submit" />
 
            </form>
            {uploadedFile ? (<div className="img">
    <h2>{uploadPercent}</h2>
    <div style={{height:'30px',width:`${uploadPercent}%`,backgroundColor:'green'}}></div>            
    <h3>{uploadedFile.fileName}</h3>
    <img src={uploadedFile.filePath} />
            </div>) : (null)
            
        }
        </React.Fragment>
    );
}

export default ProfileAvatar;