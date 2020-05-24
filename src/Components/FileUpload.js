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

    return <div>
        <div>
            <div className='upload'>
                <input type='file'
                       accept={props.accept}
                       multiple={props.multiple}
                       onChange={handleInput}
                >
                </input>
                <img style={file ? imgStyle : null}
                     src={file ? file : ''}/>
            </div>
        </div>
    </div>
}

export default FileUpload;
