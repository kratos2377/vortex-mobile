import 'package:equatable/equatable.dart';

abstract class RegisterEvent extends Equatable {}

class RegisterEmailChanged extends RegisterEvent {
  RegisterEmailChanged({this.email});
  final String? email;

  @override
  List<Object?> get props => [email];
}

class RegisterUsernameChanged extends RegisterEvent {
  RegisterUsernameChanged({this.username});
  final String? username;

  @override
  List<Object?> get props => [username];
}

class RegisterFirstNameChanged extends RegisterEvent {
  RegisterFirstNameChanged({this.first_name});
  final String? first_name;

  @override
  List<Object?> get props => [first_name];
}

class RegisterLastNameChanged extends RegisterEvent {
  RegisterLastNameChanged({this.last_name});
  final String? last_name;

  @override
  List<Object?> get props => [last_name];
}

class RegisterPasswordChanged extends RegisterEvent {
  RegisterPasswordChanged({this.password});
  final String? password;

  @override
  List<Object?> get props => [password];
}

class RegisterConfirmPasswordChanged extends RegisterEvent {
  RegisterConfirmPasswordChanged({this.confirm_password});
  final String? confirm_password;

  @override
  List<Object?> get props => [confirm_password];
}

class RegisterSubmitted extends RegisterEvent {
  @override
  List<Object?> get props => [];
}
