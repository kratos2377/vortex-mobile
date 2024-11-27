import 'package:equatable/equatable.dart';
import 'package:vortex_mobile/models/user_model.dart';

abstract class MessierEvent extends Equatable {}

class MessierUserModelDataChanged extends MessierEvent {
  MessierUserModelDataChanged({this.user_model});
  final UserModel? user_model;

  @override
  List<Object?> get props => [user_model];
}

class MessierSubmitted extends MessierEvent {
  @override
  List<Object?> get props => [];
}
