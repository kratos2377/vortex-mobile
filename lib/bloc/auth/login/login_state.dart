import 'package:equatable/equatable.dart';
import 'package:vortex_mobile/bloc/bloc_status.dart';

class LoginState extends Equatable {
  const LoginState({
    this.usernameoremail = '',
    this.password = '',
    this.appStatus = const InitialStatus(),
  });

  final String usernameoremail;
  bool get isValidEmail => usernameoremail.length > 5;

  final String password;
  bool get isValidPassword => password.length > 7;

  final AppSubmissionStatus appStatus;

  LoginState copyWith(
      {String? usernameoremail,
      String? password,
      AppSubmissionStatus? appStatus}) {
    return LoginState(
      usernameoremail: usernameoremail ?? this.usernameoremail,
      password: password ?? this.password,
      appStatus: appStatus ?? this.appStatus,
    );
  }

  @override
  List<Object?> get props => [usernameoremail, password, appStatus];
}
