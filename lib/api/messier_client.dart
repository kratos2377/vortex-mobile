import 'package:vortex_mobile/api/api_service.dart';

class MessierApiProvider {
  // User Auth Routes
  Future<String> makeLoginRequest(
      String usernameoremail, String password) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/auth/login',
        DioMethod.post,
        param: {'usernameoremail': usernameoremail, 'pwd': password},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeRegistrationCall(String first_name, String last_name,
      String username, String email, String password) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/auth/registration',
        DioMethod.post,
        param: {
          'email': email,
          'password': password,
          'first_name': first_name,
          'last_name': last_name,
          'username': username
        },
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeVerifyUserCall(String id, String user_key) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/auth/verify_user',
        DioMethod.post,
        param: {'id': id, 'user_key': user_key},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeSendEmailCall(String id, String to_email) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/auth/send_email',
        DioMethod.post,
        param: {'id': id, 'to_email': to_email},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeVerifyTokenCall(String token) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/auth/verify_token',
        DioMethod.post,
        param: {'token': token},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

// User Logic Routes

  Future<String> makeAddWalletAddressCall(
      String user_id, String wallet_address, String wallet_name) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/user/add_wallet_address',
        DioMethod.post,
        param: {
          'user_id': user_id,
          'wallet_address': wallet_address,
          'wallet_name': wallet_name
        },
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeGetUserWalletAddressCall(String user_id) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/user/get_user_wallets',
        DioMethod.post,
        param: {'user_id': user_id},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeDeleteWalletAddressCall(String id, String user_id) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/user/delete_wallet_address',
        DioMethod.post,
        param: {'id': id, 'user_id': user_id},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeChangeUserPasswordCall(
      String password, String current_password, String user_id) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/user/change_user_password',
        DioMethod.put,
        param: {
          'user_id': user_id,
          'password': password,
          'current_password': current_password
        },
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }

  Future<String> makeChangeUsernameCall(String username, String user_id) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/user/change_user_username',
        DioMethod.put,
        param: {'user_id': user_id, 'username': username},
        contentType: 'application/json',
        isMessierCall: true,
      );
      if (response.statusCode != 200) {
        print('API call failed: ${response.statusMessage}');
        return "{}";
      }

      return response.data;
    } catch (e) {
      print('Network error occurred: $e');
      return "{}";
    }
  }
}
