import 'package:uuid/uuid.dart';

class WalletModel {
  Uuid id;
  String user_id;
  String wallet_address;
  String wallet_type;

  WalletModel(
      {required this.id,
      required this.user_id,
      required this.wallet_address,
      required this.wallet_type});
}
