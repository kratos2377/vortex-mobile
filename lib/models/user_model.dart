import 'package:uuid/uuid.dart';
import 'package:vortex_mobile/models/wallet_model.dart';
import 'dart:convert';

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

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json["id"],
        username: json["username"],
        first_name: json["first_name"],
        last_name: json["last_name"],
        email: json["email"],
        verified: json["verified"],
        score: json["score"],
        token: json["token"],
        user_wallets: [],
      );
}
