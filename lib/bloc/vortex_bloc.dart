import 'package:vortex_mobile/bloc/repository.dart';
import 'package:rxdart/rxdart.dart';

class VortexBloc {
  final _repository = Repository();
  final _detailsFetcher = PublishSubject<String>();

  Stream<String> get userDetails => _detailsFetcher.stream;

  fetchUserDetails(String token) async {
    String userDetail = await _repository.fetchUserModelData(token);
    _detailsFetcher.sink.add(userDetail);
  }

  dispose() {
    _detailsFetcher.close();
  }
}
