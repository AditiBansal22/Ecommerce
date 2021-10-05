import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Avatar, Badge} from 'antd'

const FileUpload = ({values,setValues, setLoading}) => {

       const {user} = useSelector((state) => ({...state}));
       const handleImagesRemove = (public_id) => {
           setLoading(true);
           console.log('remove image:',public_id);
           axios.post(`http://localhost:8000/api/removeImages` , {public_id} ,{
               headers: {
                authtoken: user ?user.token : "",
               }
           })
           .then((resp) => {
               setLoading(false);
               const {images} =values;
               let filteredImages =images.filter((item) => {
                   return item.public_id !== public_id
               });
               setValues({...values, images:filteredImages});
           })
           .catch((err) => {
                   setLoading(false);
                 console.log("Error",err)
           });
       };

       const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3
        let allUploadedFiles = values.images;
    
        if (files) {
          setLoading(true);
          for (let i = 0; i < files.length; i++) {
            Resizer.imageFileResizer(
              files[i],
              720,
              720,
              "JPEG",
              100,
              0,
              (uri) => {
                // console.log(uri);
                axios
                  .post(
                    `http://localhost:8000/api/uploadImages`,
                    { image: uri },
                    {
                      headers: {
                        authtoken: user ? user.token : "",
                      },
                    }
                  )
                  .then((res) => {
                    console.log("IMAGE UPLOAD RES DATA", res);
                    setLoading(false);
                    allUploadedFiles.push(res.data);
    
                    setValues({ ...values, images: allUploadedFiles });
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log("CLOUDINARY UPLOAD ERR", err);
                  });
              },
              "base64"
            );
          }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
      };
        //
    
    return ( 
            <>
            <div classname="row">
                {values.images && values.images.map((image) => (
                    <Badge count="X" key = {image.public_id} onClick ={() => handleImagesRemove(image.public_id)} style={{cursor:"pointer"}}>
                     <Avatar  src ={image.url} size={100} className="ml-3" shape="square"></Avatar>
                     </Badge>
                ))}

            </div>
            <div className = "row">
                <label className="btn btn-primary">Choose File 
                <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize}/> </label>
            </div>
            </>
        )
   
}

export default FileUpload;