import 'package:equatable/equatable.dart';
import 'package:vortex_mobile/bloc/bloc_status.dart';

class RegisterState extends Equatable {
  const RegisterState({
    this.email = '',
    this.password = '',
    this.first_name = '',
    this.last_name = '',
    this.username = '',
    this.confirm_password = '',
    this.appStatus = const InitialStatus(),
  });

  final String email;
  bool get isValidEmail => email.trim().isNotEmpty && email.length > 5;

  final String password;
  bool get isValidPassword => password.trim().isNotEmpty && password.length > 7;

  final String first_name;
  bool get isValidFirstName => first_name.trim().isNotEmpty;

  final String last_name;
  bool get isValidLastName => last_name.trim().isNotEmpty;

  final String username;
  bool get isValidUsername => username.trim().isNotEmpty && username.length > 5;

  final String confirm_password;
  bool get isValidConfirmPassword =>
      confirm_password.trim().isNotEmpty &&
      confirm_password.length > 5 &&
      confirm_password == password;

  final AppSubmissionStatus appStatus;

  RegisterState copyWith(
      {String? email,
      String? password,
      String? first_name,
      String? last_name,
      String? username,
      String? confirm_password,
      AppSubmissionStatus? appStatus}) {
    return RegisterState(
      email: email ?? this.email,
      password: password ?? this.password,
      first_name: first_name ?? this.first_name,
      last_name: last_name ?? this.last_name,
      username: username ?? this.username,
      confirm_password: confirm_password ?? this.confirm_password,
      appStatus: appStatus ?? this.appStatus,
    );
  }

  @override
  List<Object?> get props => [
        email,
        password,
        first_name,
        last_name,
        username,
        confirm_password,
        appStatus
      ];
}
