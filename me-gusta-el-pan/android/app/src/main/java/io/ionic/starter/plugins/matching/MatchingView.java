package io.ionic.starter.plugins.matching;

public class MatchingView {
    public static void main(String[] args) {
        String pan1 = "pan_artesanal";
        String pan2 = "croissant";

        MatchingWindow window = new MatchingWindow(pan1, pan2);
        window.setVisible(true);
    }
}
