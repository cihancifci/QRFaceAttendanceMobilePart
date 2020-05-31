import React, { useState, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity } from 'react-native';
import { Camera, CameraCapturedPicture , CameraPictureOptions} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as FileSystem from 'expo-file-system';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { localImageUri } from "./imageUri";
import  grpc  from "../grpc"; 
var tempAdress = "";

var detectedFaces = async (imagePath : string) : Promise<Number |undefined> => {

  const options = { mode: FaceDetector.Constants.Mode.accurate, detectLandmarks : FaceDetector.Constants.Landmarks.all, runClassifications : FaceDetector.Constants.Classifications.all, tracking : true};
  var currentFaceID = await (await FaceDetector.detectFacesAsync(imagePath, options)).faces[0].faceID;
  return currentFaceID;
  
};


   function face_recognition({navigation}) {


  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [cameraRef, setCameraRef] = useState(null);
  const [autoFocus] = useState(Camera.Constants.AutoFocus.on)

  function onPictureSaved(photo : CameraCapturedPicture){

    detectedFaces(photo.uri).then((cameraFaceID) =>{
      detectedFaces(localImageUri).then((authFaceID) =>{
        console.log(cameraFaceID + " :"+ authFaceID);

        FileSystem.deleteAsync(photo.uri);
        if(cameraFaceID == authFaceID)
        {
          //navigation.navigate('grpc',{adress : tempAdress});
        }
        else
          alert("Faces not matched!");
      });
    });
  }
  async function takePhoto(){

    var photoOptions : CameraPictureOptions={
      quality : 1,
      fastMode : false,
      onPictureSaved : onPictureSaved
      
    }
    await cameraRef.takePictureAsync(photoOptions);
    
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  Camera.defaultProps.faceDetectorSettings={
    mode: FaceDetector.Constants.Mode.fast,
    detectLandmarks: FaceDetector.Constants.Landmarks.all,
    runClassifications: FaceDetector.Constants.Classifications.all,
    tracking: true
        }
  return (

    
    <View style={{ flex: 1 }}>

      <Camera style={{ flex: 1 }} type={type} autoFocus = {autoFocus}
        ref={ref => {
          setCameraRef(ref) ;
    }} 
      >

      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>

        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
            
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>

        </TouchableOpacity>
      </View>
      </Camera>
      
    <Button title="Take Photo For Face Recognize" onPress={() => takePhoto()}>Click for photo request</Button>
    
    </View>
  );
}


const Drawer = createDrawerNavigator();

function Face({route,navigation}) {
  
  const { adress } = route.params;
  tempAdress = adress;
  return (
    

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={face_recognition} />
      <Drawer.Screen name="grpc" component={grpc} />
    </Drawer.Navigator>

  );
};

export default Face;