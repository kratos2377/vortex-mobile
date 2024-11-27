import 'package:vortex_mobile/api/api_service.dart';

class NebulaApiProvider {
  Future<String> makeGetUserBetsCall(
      String id, String user_id, String page, String? game_name) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/game_bets/get_user_bets',
        DioMethod.get,
        param: {'page': page, 'user_id': user_id, 'game_name': game_name},
        contentType: 'application/json',
        isMessierCall: false,
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

  Future<String> makePlaceUserBetCall(String game_name, String game_id,
      String user_id, double bet_amount) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/game_bets/place_user_bet',
        DioMethod.put,
        param: {
          'user_id': user_id,
          'game_name': game_name,
          'game_id': game_id,
          'bet_amount': bet_amount
        },
        contentType: 'application/json',
        isMessierCall: false,
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

  Future<String> makeUpdateUserBetsCall(
      String game_id, String user_id, double bet_amount) async {
    try {
      final response = await APIService.instance.request(
        '/api/v1/game_bets/update_user_bet',
        DioMethod.put,
        param: {
          'user_id': user_id,
          'game_id': game_id,
          'add_more_amount': bet_amount
        },
        contentType: 'application/json',
        isMessierCall: false,
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
