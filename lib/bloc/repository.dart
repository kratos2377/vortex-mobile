import 'package:vortex_mobile/api/messier_client.dart';
import 'package:vortex_mobile/api/nebula_client.dart';

class Repository {
  final messierApiProvider = MessierApiProvider();
  final nebulaApiProvider = NebulaApiProvider();

//Auth Calls
  Future<String> fetchUserModelData(String token) =>
      messierApiProvider.makeVerifyTokenCall(token);

  Future<String> userLoginCall(String usernameoremail, String password) =>
      messierApiProvider.makeLoginRequest(usernameoremail, password);

  Future<String> userRegistrationCall(String email, String username,
          String first_name, String last_name, String password) =>
      messierApiProvider.makeRegistrationCall(
          first_name, last_name, username, email, password);
}
