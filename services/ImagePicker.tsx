import { useState,useContext} from 'react';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';

// El método de uploadImage que utilizaremos, lo tenemos definido en la lección de firebase.    
import {uploadImage, uploadProfileImage} from './User.service';

const ImagePickerExample = ({ type, uid }: { type: string, uid: string }) => {
    const [image, setImage] = useState(null);

    const uploadImageAsync = async(uri: string) => {
        const blob = await new Promise((resolve, reject) => {
 
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        return blob;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.canceled){
            setImage(result.uri);
            const blob = await uploadImageAsync(result.uri);
            if (type === 'profile') {
                await uploadProfileImage(blob, uid);
            } else {
                await uploadImage(blob, 'ruta/subida/foto');
            }
        };
    };

    const buttonTitle = type === 'profile' ? 'Upload Profile Picture' : 'Pick an image from camera roll';

    return (
        <>
        <Button title={buttonTitle} onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </>
    );
}; 

ImagePickerExample.propTypes = {
  type: PropTypes.oneOf(['generic', 'profile']).isRequired,
  uid: PropTypes.string,
};

export default ImagePickerExample;