package com.yjj.demo.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Task {
    private int id;
    private String content;
    private LocalDateTime date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(String time) {
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        this.date = LocalDateTime.parse(time, df);
    }

    @Override
    public String toString(){
        return "{" +
                "\"id\":\"" + id +
                "\", \"content\":\"" + content + '\"' +
                ", \"date\":\"" + date + '\"' +
                '}';
    }
}
