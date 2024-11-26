import 'package:uuid/uuid.dart';
import 'package:vortex_mobile/models/wallet_model.dart';

class UserModel {
  Uuid id;
  String username;
  String email;
  String first_name;
  String last_name;
  bool verified;
  int score;
  String token;
  List<WalletModel> user_wallets;

  UserModel({
    required this.id,
    required this.username,
    required this.email,
    required this.first_name,
    required this.last_name,
    required this.verified,
    required this.score,
    required this.token,
    required this.user_wallets,
  });
}
