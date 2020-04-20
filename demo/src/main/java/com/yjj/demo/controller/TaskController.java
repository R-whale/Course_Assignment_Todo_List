package com.yjj.demo.controller;

import com.yjj.demo.model.Task;
import com.yjj.demo.store.TaskDB;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class TaskController {
    @RequestMapping("/tasklist")
     public List<Task> getAllTask(){
        List<Task> taskList = new ArrayList<>();
        Map<Integer, Task> taskMap= TaskDB.getInstance().getTaskList();
//        for(int i=0;i<10;i++){
//            Task task = new Task();
//            task.setId(i);
//            task.setContent("task " + i);
//            task.setDate("2020-1-1 00:00:00");
//            list.add(task);
//        }
        for(Map.Entry entry : taskMap.entrySet()){
            taskList.add((Task) entry.getValue());
        }
        return taskList;

    }
    @PostMapping(value = "/addtask", produces = "application/json;charset=UTF-8")
    public List<Task> create(@RequestBody Task task) {
        TaskDB.getInstance().addTask(task);
        return getAllTask();
    }
    @DeleteMapping("/task/delete/{id}")
    public List<Task> deleteTaskById(@PathVariable("id")int id){
        System.out.println(id);
        TaskDB.getInstance().deleteTask(id);
        return getAllTask();
    }

    @PutMapping("task/update/{id}")
    public List<Task> updateTask(@PathVariable(value = "id") int id, String content){
        TaskDB.getInstance().updateTask(id, content);
        return getAllTask();
    }
}
