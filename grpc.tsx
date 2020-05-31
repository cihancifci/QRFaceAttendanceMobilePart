import React, { useState } from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';


import { createDrawerNavigator } from '@react-navigation/drawer';
const { AttendanceServicePromiseClient } = require('./attendance_grpc_web_pb.js');
const { RecordRequest } = require('./attendance_pb.js');
import { studentID } from "./components/studentID";

var grpcAdress = "";

function App() {

  const [statementMessage, setStatementMessage] = useState("Sending attendance request...");

  const serverUrl =  grpcAdress;
  const promiseClient = new AttendanceServicePromiseClient(serverUrl, null, null);

  const callGrpcServicePromise = async () => {
    const request = new RecordRequest();
    request.setStudentid(studentID);
    try {
      const result = await promiseClient.attendanceRecord(request, {});
      setStatementMessage(result.getStatementmessage());
      }

    catch (error) {
      setStatementMessage(error);
      alert(error);
      }
  };

  callGrpcServicePromise();
  
  return (
    <>
      <View style={styles.container}>
        
        <Text>{statementMessage}</Text>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




const Drawer = createDrawerNavigator();

function grpcRequest({route,navigation}) {
  const { adress } = route.params;
  grpcAdress = adress;
  return (
      <Drawer.Navigator initialRouteName="grpcRequest">
        <Drawer.Screen name="grpcRequest" component={App} />
      </Drawer.Navigator>
  );
}

export default grpcRequest;