import 'package:equatable/equatable.dart';

abstract class LoginEvent extends Equatable {}

class LoginUsernameOrEmailChanged extends LoginEvent {
  LoginUsernameOrEmailChanged({this.usernameoremail});
  final String? usernameoremail;

  @override
  List<Object?> get props => [usernameoremail];
}

class LoginPasswordChanged extends LoginEvent {
  LoginPasswordChanged({this.password});
  final String? password;

  @override
  List<Object?> get props => [password];
}

class LoginSubmitted extends LoginEvent {
  @override
  List<Object?> get props => [];
}
