package io.ionic.starter.plugins.chat;

public class ChatPlugin {
    public static void main(String[] args) {
        String pan1 = "Pan artesanal";
        String pan2 = "Croissant";
        ChatWindow window = new ChatWindow(pan1, pan2);
        window.setVisible(true);
    }
}
