import database from '@react-native-firebase/database';

class FirebaseService {
  async get_value(ref) {
    try {
      let snapshot = await database().ref(ref).once('value');
      return snapshot.val();
    } catch(err) {
      throw new Error(err);
    }
  }

  async write_value(ref, val) {
    try {
      await database().ref(ref).set(val);

      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

  async get_childs(ref) {
    try {
      let snapshot = await database().ref(ref).once('value');
      return snapshot.val();
    } catch (err) {
      throw new Error(err);
    }
  }

  async push_value(ref, val) {
    try {
      let new_ref = await database().ref(ref).push();
      await new_ref.set(val);

      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

  async subsribe(ref, callback) {
    database().ref(ref).limitToLast(1).on('child_added', callback);
  }
}

export default new FirebaseService();