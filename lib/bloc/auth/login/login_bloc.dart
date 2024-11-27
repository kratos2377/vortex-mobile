import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vortex_mobile/bloc/auth/login/login_event.dart';
import 'package:vortex_mobile/bloc/auth/login/login_state.dart';
import 'package:vortex_mobile/bloc/bloc_status.dart';
import 'package:vortex_mobile/bloc/repository.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final Repository? authRepo;

  LoginBloc({this.authRepo}) : super(const LoginState()) {
    on<LoginEvent>((event, emit) async {
      await mapEventToState(event, emit);
    });
  }

  Future mapEventToState(LoginEvent event, Emitter<LoginState> emit) async {
    // Email updated
    if (event is LoginUsernameOrEmailChanged) {
      emit(state.copyWith(usernameoremail: event.usernameoremail));

      // Password updated
    } else if (event is LoginPasswordChanged) {
      emit(state.copyWith(password: event.password));

      // Form submitted
    } else if (event is LoginSubmitted) {
      emit(state.copyWith(appStatus: FormSubmitting()));

      try {
        await authRepo
            ?.userLoginCall(state.usernameoremail, state.password)
            .then((value) {
          emit(state.copyWith(appStatus: const SubmissionSuccess()));
        });
      } catch (e) {
        emit(state.copyWith(appStatus: SubmissionFailed(e)));
      }
    }
  }
}
