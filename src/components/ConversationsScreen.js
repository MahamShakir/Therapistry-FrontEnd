import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import ChatService from '../services/ChatService';

import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Text, Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConversationsScreen({route}) {

  let userReducer = useSelector(state => state.userReducer.login);

  const navigator = useNavigation();

  const currentUserId = userReducer.data.role_id;
  const otherUser = route.params.conversation_with.id;

  let [messages, setMessages] = useState([]);
  let [chatRef, setChatRef] = useState("");

  let listenToNewMessages = false;

  function handleOnReceiveMessage(newMsg) {
    if(listenToNewMessages) {
      if(newMsg) {
        setMessages(msgs => [newMsg, ...msgs]);
      }
    } else {
      listenToNewMessages = true;
    }
  }

  useEffect(() => {
    try {
      ChatService.get_chat(currentUserId, otherUser, handleOnReceiveMessage).then(({chat, chat_ref}) => {
        chat.sort((a, b) => {
          let date_a = new Date(a.createdAt);
          let date_b = new Date(b.createdAt);

          if(date_a < date_b) return 1;
          else if(date_a > date_b) return -1;
          return 0;
        });
        setMessages(chat);
        setChatRef(chat_ref);
        listenToNewMessages = true;
      }).catch(err => {
        console.error(err);
      });
    } catch(err) {
      console.error(err);
    }
  }, []);

  const handleOnSend = (messages = []) => {
    try {

      messages = messages.map(msg => {
        msg.createdAt = msg.createdAt.getTime();
        return msg;
      })
      ChatService.send_message(chatRef, messages).then(res => {
        
      }).catch(err => {
        console.error(err);
      })
    } catch(err) {
      console.error(err);
    }
  };

  if(chatRef) {
    return (
      <View style={{flex:1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {navigator.goBack()}} />
          <Appbar.Content title={route.params.conversation_with.fullName} style={{marginLeft:0}} />
        </Appbar.Header>
      
        <GiftedChat
          messages={messages}
          onSend={messages => handleOnSend(messages)}
          user={{_id: currentUserId, avatar: "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"}}
          renderBubble={(props) => {
            return (
              <Bubble {...props} wrapperStyle={{
                  left: {
                    backgroundColor: "#ddd"
                  }
                }}
              />
            )
          }}
        />
      </View>
    )
  } else {
    return <Text>Please wait...</Text>
  }
}