import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "@/components/explore/styles";

type MessageModalProps = {
  visible: boolean;
  targetName: string;
  onClose: () => void;
  onSend: (msg: string) => void;
};

export function MessageModal({
  visible,
  targetName,
  onClose,
  onSend,
}: MessageModalProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text.trim());
    setText("");
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.msgSheet}>
          <Text style={styles.msgSheetTitle}>Message {targetName}</Text>
          <TextInput
            style={styles.msgInput}
            placeholder="Say something nice..."
            placeholderTextColor="#555"
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
            textAlignVertical="top"
          />
          <View style={styles.msgSheetRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
