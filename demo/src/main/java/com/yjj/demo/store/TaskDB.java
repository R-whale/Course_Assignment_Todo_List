package com.yjj.demo.store;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yjj.demo.model.Task;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TaskDB {
    private int idindex = 0;
    private static TaskDB instance = null;
    private Map<Integer, Task> taskMap = new HashMap<>();

    public synchronized static TaskDB getInstance() {
        if (instance == null) {
            instance = new TaskDB();
        }
        return instance;
    }
    public Map<Integer, Task> getTaskList(){
        try {
            String taskStr = FileUtils.readFileToString(new File("src/main/resources/taskdb.json"), "utf8" );
            JSONArray jsonArray = JSONArray.parseArray(taskStr);
            for (int i = 0;i < jsonArray.size(); i++){
                JSONObject jsonpObject = jsonArray.getJSONObject(i);
                Task task = new Task();
                task.setId(jsonpObject.getInteger("id"));
                task.setContent(jsonpObject.getString("content"));
                task.setDate(jsonpObject.getString("date"));
                taskMap.put(task.getId(), task);
            }

        } catch  (IOException e) {
            e.printStackTrace();
        }
        return taskMap;

    }
    public boolean addTask(Task task){
        taskMap = getTaskList();
        int id = getCurrentId(taskMap);
        task.setId(id);
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        task.setDate(LocalDateTime.now().format(df).toString());
        taskMap.put(id, task);
        return writeTaskToFile();

    }

    private boolean writeTaskToFile() {
        List<Task> taskList = new ArrayList<>();
        for (Map.Entry entry : taskMap.entrySet()){
            taskList.add((Task) entry.getValue());
        }
        String result = JSON.toJSONString(taskList);
        try {
            FileUtils.writeStringToFile(new File("src/main/resources/taskdb.json"), result, "utf8");
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private int getCurrentId(Map<Integer, Task> map) {
        int maxID = 0;
        for(Integer id : map.keySet()){
            maxID = maxID > id ? maxID : id;
        }
        return ++maxID;
    }

    public boolean deleteTask(int id) {
        taskMap = getTaskList();
        taskMap.remove(id);
        return writeTaskToFile();

    }
    public boolean updateTask(int id, String content) {
        Task task = taskMap.get(id);
        if(task != null){
            task.setContent(content);
            DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            task.setDate(LocalDateTime.now().format(df).toString());
            taskMap.put(id, task);
        }
        return writeTaskToFile();
    }
}




