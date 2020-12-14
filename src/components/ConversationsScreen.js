import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import ChatService from '../services/ChatService';

import { GiftedChat } from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';

export default function ConversationsScreen({route}) {

  let userReducer = useSelector(state => state.userReducer.login);

  const currentUserId = userReducer.data.user_id;
  const otherUser = route.params.conversation_with;

  let [messages, setMessages] = useState([]);
  let [chatRef, setChatRef] = useState("");

  function handleOnReceiveMessages(msgs) {
    if(msgs) {
      setMessages(msgs);
    }
  }

  useEffect(() => {
    try {
      ChatService.get_chat(currentUserId, otherUser, handleOnReceiveMessages).then(({chat, chat_ref}) => {
        setMessages(chat);
        setChatRef(chat_ref);
      }).catch(err => {
        console.error(err);
      });
    } catch(err) {
      console.error(err);
    }
  }, []);

  const handleOnSend = (messages = []) => {
    try {
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
      <GiftedChat
        messages={messages}
        onSend={messages => handleOnSend(messages)}
        user={{_id: currentUserId}}
      />
    )
  } else {
    return <Text>Please wait...</Text>
  }
}