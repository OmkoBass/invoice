import React, { useState } from 'react'

function FileUpload(props) {
    const [file, setFile] = useState(null);

    const handleInput = event => {
        setFile(URL.createObjectURL(event.target.files[0]));

        props.imgCallBack(event.target.files[0]);
    }

    const imgStyle = {
        height: '150px'
    }

    return <div className='upload'>
            <label className='upload-button'>
                <input type='file'
                       accept={props.accept}
                       multiple={props.multiple}
                       onChange={handleInput}
                >
                </input>
                <span>
                    Otpremite sliku
                </span>
            </label>
            <img style={file ? imgStyle : null}
                 src={file ? file : ''}
            alt=''/>
        </div>
}

export default FileUpload;
