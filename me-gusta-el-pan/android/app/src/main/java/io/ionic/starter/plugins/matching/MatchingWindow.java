package io.ionic.starter.plugins.matching;

import io.ionic.starter.plugins.chat.ChatWindow; // 👈 Importamos el chat
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MatchingWindow extends JFrame {
    private JLabel lblTitle, lblImage1, lblImage2, lblMessage;
    private JButton btnChat, btnContinue;
    private String pan1;
    private String pan2;

    public MatchingWindow(String pan1, String pan2) {
        this.pan1 = pan1;
        this.pan2 = pan2;

        setTitle("¡Match de Panes! 🍞❤️");
        setSize(400, 500);
        setLayout(null);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        getContentPane().setBackground(Color.WHITE);

        lblTitle = new JLabel("¡Es un Match!");
        lblTitle.setFont(new Font("Poppins", Font.BOLD, 28));
        lblTitle.setForeground(new Color(255, 80, 80));
        lblTitle.setBounds(100, 20, 300, 40);
        add(lblTitle);

        // Imagen del primer pan
        lblImage1 = new JLabel(new ImageIcon("assets/panes/" + pan1 + ".jpg"));
        lblImage1.setBounds(50, 80, 120, 120);
        lblImage1.setBorder(BorderFactory.createLineBorder(new Color(255, 80, 80), 3));
        add(lblImage1);

        // Imagen del segundo pan
        lblImage2 = new JLabel(new ImageIcon("assets/panes/" + pan2 + ".jpg"));
        lblImage2.setBounds(220, 80, 120, 120);
        lblImage2.setBorder(BorderFactory.createLineBorder(new Color(255, 80, 80), 3));
        add(lblImage2);

        lblMessage = new JLabel("<html>El Pan " + pan1 + " y el Pan " + pan2 +
                " se gustan 😍<br><br>¡Empieza a chatear y compartan una mantequilla!</html>");
        lblMessage.setFont(new Font("Poppins", Font.PLAIN, 14));
        lblMessage.setBounds(40, 220, 320, 100);
        lblMessage.setHorizontalAlignment(SwingConstants.CENTER);
        add(lblMessage);

        btnChat = new JButton("Ir al chat 💬");
        btnChat.setBackground(new Color(255, 80, 80));
        btnChat.setForeground(Color.WHITE);
        btnChat.setFocusPainted(false);
        btnChat.setBounds(100, 350, 200, 40);
        add(btnChat);

        btnContinue = new JButton("Seguir buscando 🔎");
        btnContinue.setBackground(new Color(230, 230, 230));
        btnContinue.setFocusPainted(false);
        btnContinue.setBounds(100, 400, 200, 40);
        add(btnContinue);

        // Eventos de los botones
        btnChat.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                openChatWindow();
            }
        });

        btnContinue.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                dispose();
            }
        });
    }

    // 👇 Nuevo método para abrir el chat
    private void openChatWindow() {
        dispose();
        ChatWindow chat = new ChatWindow(pan1, pan2);
        chat.setVisible(true);
    }
}
