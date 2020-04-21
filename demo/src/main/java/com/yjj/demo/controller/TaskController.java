package com.yjj.demo.controller;

import com.yjj.demo.model.Task;
import com.yjj.demo.store.TaskDB;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class TaskController {
    @RequestMapping("/tasklist")
    @ResponseBody
     public List<Task> getAllTask(HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin", "*");
        List<Task> taskList = new ArrayList<>();
        Map<Integer, Task> taskMap= TaskDB.getInstance().getTaskList();
        for(Map.Entry entry : taskMap.entrySet()){
            taskList.add((Task) entry.getValue());
        }
        return taskList;

    }
    @PostMapping(value = "/addtask", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<Task> create(@RequestBody Task task, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        TaskDB.getInstance().addTask(task);
        return getAllTask(response);
    }
    @DeleteMapping("/task/delete/{id}")
    @ResponseBody
    public List<Task> deleteTaskById(@PathVariable("id")int id, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin", "*");
        System.out.println(id);
        TaskDB.getInstance().deleteTask(id);
        return getAllTask(response);
    }

    @PutMapping("task/update/{id}")
    @ResponseBody
    public List<Task> updateTask(@PathVariable(value = "id") int id, String content, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin", "*");
        TaskDB.getInstance().updateTask(id, content);
        return getAllTask(response);
    }
}
