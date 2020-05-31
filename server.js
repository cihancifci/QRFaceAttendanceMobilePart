const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const server = new grpc.Server();

const packageDefinition = protoLoader.loadSync(
  './attendance.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const attendanceProto = grpc.loadPackageDefinition(packageDefinition).attendance;

const attendanceRecord = (call, callback) => {
  console.log(call.request.studentID);
  return callback(null, { statementMessage: 'Attendance is succesfully!' });
};

server.addService(attendanceProto.AttendanceService.service, {
  attendanceRecord,
});

server.bind('localhost:8080', grpc.ServerCredentials.createInsecure());
server.start();

console.log('Server started ...');
