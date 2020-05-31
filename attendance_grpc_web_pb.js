/**
 * @fileoverview gRPC-Web generated client stub for attendance
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.attendance = require('./attendance_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.attendance.AttendanceServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.attendance.AttendanceServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.attendance.RecordRequest,
 *   !proto.attendance.RecordResponse>}
 */
const methodDescriptor_AttendanceService_AttendanceRecord = new grpc.web.MethodDescriptor(
  '/attendance.AttendanceService/AttendanceRecord',
  grpc.web.MethodType.UNARY,
  proto.attendance.RecordRequest,
  proto.attendance.RecordResponse,
  /**
   * @param {!proto.attendance.RecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.attendance.RecordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.attendance.RecordRequest,
 *   !proto.attendance.RecordResponse>}
 */
const methodInfo_AttendanceService_AttendanceRecord = new grpc.web.AbstractClientBase.MethodInfo(
  proto.attendance.RecordResponse,
  /**
   * @param {!proto.attendance.RecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.attendance.RecordResponse.deserializeBinary
);


/**
 * @param {!proto.attendance.RecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.attendance.RecordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.attendance.RecordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.attendance.AttendanceServiceClient.prototype.attendanceRecord =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/attendance.AttendanceService/AttendanceRecord',
      request,
      metadata || {},
      methodDescriptor_AttendanceService_AttendanceRecord,
      callback);
};


/**
 * @param {!proto.attendance.RecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.attendance.RecordResponse>}
 *     A native promise that resolves to the response
 */
proto.attendance.AttendanceServicePromiseClient.prototype.attendanceRecord =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/attendance.AttendanceService/AttendanceRecord',
      request,
      metadata || {},
      methodDescriptor_AttendanceService_AttendanceRecord);
};


module.exports = proto.attendance;

