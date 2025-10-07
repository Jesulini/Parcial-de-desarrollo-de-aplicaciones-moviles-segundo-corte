package io.ionic.starter.plugins.chat;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

public class ChatWindow extends JFrame {
    private JPanel chatPanel;
    private JTextField inputField;
    private JButton sendButton;
    private JScrollPane scrollPane;
    private ArrayList<String> messages = new ArrayList<>();
    private String pan1;
    private String pan2;

    public ChatWindow(String pan1, String pan2) {
        this.pan1 = pan1;
        this.pan2 = pan2;

        setTitle("Chat entre " + pan1 + " y " + pan2 + " 💬");
        setSize(400, 600);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null);
        getContentPane().setBackground(new Color(245, 245, 245));
        setLayout(new BorderLayout());

        // Encabezado
        JLabel header = new JLabel("💬 " + pan2 + " está en línea", SwingConstants.CENTER);
        header.setFont(new Font("Poppins", Font.BOLD, 18));
        header.setForeground(Color.WHITE);
        header.setOpaque(true);
        header.setBackground(new Color(255, 80, 80));
        header.setPreferredSize(new Dimension(400, 50));
        add(header, BorderLayout.NORTH);

        // Panel de mensajes
        chatPanel = new JPanel();
        chatPanel.setLayout(new BoxLayout(chatPanel, BoxLayout.Y_AXIS));
        chatPanel.setBackground(new Color(245, 245, 245));
        chatPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

        scrollPane = new JScrollPane(chatPanel);
        scrollPane.setBorder(null);
        add(scrollPane, BorderLayout.CENTER);

        // Campo de texto y botón de enviar
        JPanel inputPanel = new JPanel(new BorderLayout());
        inputPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
        inputField = new JTextField();
        inputField.setFont(new Font("Poppins", Font.PLAIN, 14));
        sendButton = new JButton("Enviar");
        sendButton.setBackground(new Color(255, 80, 80));
        sendButton.setForeground(Color.WHITE);
        sendButton.setFocusPainted(false);
        sendButton.setFont(new Font("Poppins", Font.BOLD, 14));

        inputPanel.add(inputField, BorderLayout.CENTER);
        inputPanel.add(sendButton, BorderLayout.EAST);
        add(inputPanel, BorderLayout.SOUTH);

        // Eventos
        sendButton.addActionListener(e -> sendMessage());
        inputField.addActionListener(e -> sendMessage());
    }

    private void sendMessage() {
        String text = inputField.getText().trim();
        if (!text.isEmpty()) {
            addMessage(pan1 + ": " + text, true);
            inputField.setText("");

            // Simulación de respuesta automática
            SwingUtilities.invokeLater(() -> {
                addMessage(pan2 + ": Me gusta ese pan 😍", false);
            });
        }
    }

    private void addMessage(String message, boolean isUser) {
        JPanel messageBubble = new JPanel();
        messageBubble.setLayout(new BorderLayout());
        JLabel label = new JLabel("<html>" + message + "</html>");
        label.setFont(new Font("Poppins", Font.PLAIN, 14));
        label.setBorder(new EmptyBorder(8, 12, 8, 12));

        if (isUser) {
            label.setBackground(new Color(255, 80, 80));
            label.setForeground(Color.WHITE);
            messageBubble.add(label, BorderLayout.EAST);
        } else {
            label.setBackground(new Color(220, 220, 220));
            label.setForeground(Color.BLACK);
            messageBubble.add(label, BorderLayout.WEST);
        }

        label.setOpaque(true);
        chatPanel.add(messageBubble);
        chatPanel.revalidate();
        chatPanel.repaint();
        scrollPane.getVerticalScrollBar().setValue(scrollPane.getVerticalScrollBar().getMaximum());
    }
}
