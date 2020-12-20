import FirebaseService from "./FirebaseService";

class ChatService {

  get_existing_chats_ref_url(id1, id2) {
    return `/existing_chats/${id1}+${id2}`;
  }

  get_chats_ref_url(id1, id2) {
    return `/chats/${id1}+${id2}`;
  }

  async create_chat(id1, id2) {
    try {
      let chat_exists = await FirebaseService.get_value(this.get_existing_chats_ref_url(id1, id2));
      if(chat_exists === true) {
        return this.get_chats_ref_url(id1, id2);
      } else {
        chat_exists = await FirebaseService.get_value(this.get_existing_chats_ref_url(id2, id1));
        if(chat_exists === true) {
          return this.get_chats_ref_url(id2, id1);
        } else {
          await FirebaseService.write_value(this.get_existing_chats_ref_url(id1, id2), true);
          return this.get_chats_ref_url(id1, id2);
        }
      }
    } catch(err) {
      throw new Error(err);
    }
  }

  async get_chat(id1, id2, onReceiveMessage) {
    try {
      let chat_ref = await this.create_chat(id1, id2);
      await FirebaseService
      let chat = await FirebaseService.subsribe(chat_ref, (snapshot) => {
        let val = snapshot.val();
        onReceiveMessage(val);
      });
      chat = this.extract_messages(chat) || [];
      return {chat, chat_ref};
    } catch(err) {
      throw new Error(err);
    }
  }

  async send_message(chat_ref, messages) {
    try {
      await FirebaseService.push_value(chat_ref, messages[0]);
    } catch(err) {
      throw new Error(err);
    }
  }

  extract_messages(firebase_msgs) {
    if(!firebase_msgs) return firebase_msgs;
    return Object.values(firebase_msgs).flat();
  }
}

export default new ChatService();