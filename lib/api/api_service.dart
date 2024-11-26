import 'dart:io';

import 'package:dio/dio.dart';

enum DioMethod { post, get, put, delete }

class APIService {
  APIService._singleton();
  static final APIService instance = APIService._singleton();

  String getBaseUrl(isMessierCall) {
    return isMessierCall ? "messier-url" : "nebula-url";
  }

  Future<Response> request(
    String endpoint,
    DioMethod method, {
    Map<String, dynamic>? param,
    Map<String, dynamic>? headers,
    String? contentType,
    formData,
    required bool isMessierCall,
  }) async {
    try {
      final dio = Dio(
        BaseOptions(
          baseUrl: getBaseUrl(isMessierCall),
          contentType: contentType ?? Headers.jsonContentType,
          headers: headers,
        ),
      );
      switch (method) {
        case DioMethod.post:
          return dio.post(
            endpoint,
            data: param ?? formData,
          );
        case DioMethod.get:
          return dio.get(
            endpoint,
            queryParameters: param,
          );
        case DioMethod.put:
          return dio.put(
            endpoint,
            data: param ?? formData,
          );
        case DioMethod.delete:
          return dio.delete(
            endpoint,
            data: param ?? formData,
          );
        default:
          return dio.post(
            endpoint,
            data: param ?? formData,
          );
      }
    } catch (e) {
      throw Exception('Network error');
    }
  }
}
