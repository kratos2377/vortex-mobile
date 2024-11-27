import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vortex_mobile/bloc/auth/register/register_event.dart';
import 'package:vortex_mobile/bloc/auth/register/register_state.dart';
import 'package:vortex_mobile/bloc/bloc_status.dart';
import 'package:vortex_mobile/bloc/repository.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final Repository? authRepo;

  RegisterBloc({this.authRepo}) : super(const RegisterState()) {
    on<RegisterEvent>((event, emit) async {
      await mapEventToState(event, emit);
    });
  }

  Future mapEventToState(
      RegisterEvent event, Emitter<RegisterState> emit) async {
    // Email updated
    if (event is RegisterEmailChanged) {
      emit(state.copyWith(email: event.email));

      // Password updated
    } else if (event is RegisterPasswordChanged) {
      emit(state.copyWith(password: event.password));
    } else if (event is RegisterFirstNameChanged) {
      emit(state.copyWith(first_name: event.first_name));
    } else if (event is RegisterLastNameChanged) {
      emit(state.copyWith(last_name: event.last_name));
    } else if (event is RegisterUsernameChanged) {
      emit(state.copyWith(username: event.username));
    } else if (event is RegisterConfirmPasswordChanged) {
      emit(state.copyWith(confirm_password: event.confirm_password));

      // Form submitted
    } else if (event is RegisterSubmitted) {
      emit(state.copyWith(appStatus: FormSubmitting()));

      try {
        await authRepo
            ?.userRegistrationCall(state.email, state.username,
                state.first_name, state.last_name, state.password)
            .then((value) {
          emit(state.copyWith(appStatus: const SubmissionSuccess()));
        });
      } catch (e) {
        emit(state.copyWith(appStatus: SubmissionFailed(e)));
      }
    }
  }
}
