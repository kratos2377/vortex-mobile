import 'package:equatable/equatable.dart';
import 'package:uuid/uuid.dart';
import 'package:vortex_mobile/bloc/bloc_status.dart';
import 'package:vortex_mobile/models/user_model.dart';

class MessierState extends Equatable {
  const MessierState({
    this.userModel,
    this.appStatus = const InitialStatus(),
  });

  final UserModel? userModel;

  final AppSubmissionStatus appStatus;

  MessierState copyWith(UserModel _userModel, AppSubmissionStatus? appStatus) {
    return MessierState(
        userModel: _userModel ?? this.userModel,
        appStatus: appStatus ?? this.appStatus);
  }

  @override
  List<Object?> get props => [userModel];
}
